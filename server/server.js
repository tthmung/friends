const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mysql = require("mysql");
const app = express();

// Using localhost for MysQL.
// Does not need much security or privacy for demo purposes.
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'friend_zone'
});

const cookieAge = 1000 * 60 * 60 * 24; // 24 hours

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('trust proxy', 1);

app.use(session({
  name: 'friend_zone',
	secret: 'secret',
  proxy: true,
	resave: false,
	saveUninitialized: false,
  cookie: {
    sameSite: true,
    secure: 'auto',
    age: cookieAge,
  }
}))

app.use(cors({
  origin: 'http://localhost:3000',
  method: ['POST', 'PUT', 'OPTIONS', 'GET', 'HEAD'],
  credentials: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Sign Up
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

// Login
app.post('/api/login', function(req, res) {

  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    con.query('SELECT * FROM users WHERE email = ? AND password = SHA2(?, 256)', [
      email,
      password
    ], (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        const sessionUser = {
          email: result[0].email,
          name: result[0].name,
          admin: result[0].admin
        }

        req.session.user = sessionUser;

        req.session.save();

        console.log(req.session);
        res.send({result: result});
      } else {
        res.send({message: "Wrong username or password"});
      }
    });

  }
});

// Logout
app.get('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
  });
});

app.get('/api/main', function(req, res) {
  console.log('main: ', req.session.user)
  req.session.isAuth = true;
  res.write('Hello');
  if (req.session.user) {
    res.send({message: "Hello World"});
  }
});


app.listen(8080);
