const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const cors = require("cors");
const mysql = require("mysql");
const app = express();

// Using localhost for MysQL.
// Does not need much security or privacy for demo purposes.
var con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'friend_zone'
});


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
  cookie: {
    maxAge: 900000,
    secure: false,
    user: '',
    name: '',
    admin: false
  }
}))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/api/register', (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const introduction = req.body.introduction;
  const password = req.body.password;

  con.query("INSERT INTO users(email, password, name, introduction) VALUES (?, SHA2(?, 256), ?, ?)",
  [email, password, name, introduction],
  (err, result) => {
    console.log(err);
  });
});

app.post('/api/auth', (req, rep) =>  {

  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    con.query('SELECT * FROM users WHERE email = ? AND password = SHA2(?, 256)', [
      email,
      password
    ], (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        req.session.cookie.email = result[0].email;
        req.session.cookie.name = result[0].name;
        req.session.cookie.admin = result[0].admin;

        req.session.save();
        console.log('Login: ', req.session.cookie);
        rep.send({result});
      } else {
        rep.send({message: "Wrong username or password"});
      }
    });

  }
});

app.get('/api/auth', (req, rep) => {
  console.log('main', req.session.cookie)
  if (req.session.cookie.name) {
    rep.send({message: "Hello World"})
  }
});


app.listen(8080);
