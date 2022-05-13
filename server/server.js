const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const db = require('./db');

const mysqlStore = require('express-mysql-session')(session);

const options = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'session_storage',
  createDatabaseTable: true
}

const sessionStore = new mysqlStore(options);

const cookieAge = 1000 * 60 * 60 * 24; // 24 hours

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  name: 'friend_zone',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    sameSite: true,
    secure: false,
    age: cookieAge,
  }
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Unsafe but session is not saving for some reasons.
let conn;

// Sign Up
app.post('/api/register', async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const introduction = req.body.introduction;
  const password = req.body.password;

  await db.register(email, password, name, introduction);
});

// Login
app.post('/api/login', async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    user = await db.checkUser(email, password);

    if (user) {
      const userinfo = {
        email: user.email,
        name: user.name,
        admin: user.admin
      }

      req.session.user = userinfo;
      req.session.save();
      conn = userinfo;
      res.send({ result: user });
    } else {
      res.send({ message: 'Wrong username or password' });
    }

  } catch (e) {
    console.log(e);
  }
});


// Logout
app.get('/api/logout', (req, res) => {
  conn = null;
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
  });
});

// Check if session exist
app.get('/api/main', (req, res) => {
  if (conn) {
    res.send({ result: conn });
  } else {
    res.send({ message: 'Sign in failed' });
  }
});

// Format ISO 8601 to nice date format
createFromMysql = function (mysql_string) {
  var d = new Date(mysql_string);
  const date = d.toLocaleString();
  return date;
}

app.get('/api/events', async (req, res) => {
  events = await db.getEvents();

  for (var i = 0; i < events.length; i++) {
    var time = events[i].time;
    events[i].time = createFromMysql(time);
  }
  res.send({ events: events });
});

// Post and event
app.post('/api/postevent', async (req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const description = req.body.description;
  const time = req.body.time;
  const location = req.body.location;
  const slots = req.body.slots;
  const category = req.body.category;
  const subcategory = req.body.subcategory;

  await db.postEvent(email, title, description, time, location, slots, category, subcategory);
});

app.listen(8080, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", 8080);
});
