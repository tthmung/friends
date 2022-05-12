const mysql = require("mysql");

// Using localhost for MysQL.
// Does not need much security or privacy for demo purposes.
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'friend_zone'
});

let db = {};

// Register a user
db.register = (email, password, fullname, introduction) => {
    return new Promise((resolve, reject) => {
        con.query("INSERT INTO users(email, password, name, introduction) VALUES (?, SHA2(?, 256), ?, ?)",
            [email, password, fullname, introduction],
            (err, result) => {
                if (err) reject(err);

                return resolve(result);
            });
    });
};

// Check if a user is already registered
db.checkUser = (email, password) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM users WHERE email = ? AND password = SHA2(?, 256)',
            [email, password],
            (err, result) => {
                if (err) {
                    reject(err);
                }


                if (result.length > 0) {
                    return resolve(result[0]);
                } else {
                    return resolve(null);
                }
            });
    });
};

// Post an Event
db.postEvent = (email, title, description, time, location, slots, category, subcategory) => {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO events(email, title, description, time, location, slots, category, subcategory) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
            [email, title, description, time, location, slots, category, subcategory], (err, result) => {
                if (err) {
                    reject(err);
                }

                return resolve(result);
            });
    });
};

// Get all events
db.getEvents = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM events',
            (err, result) => {
                if (err) {
                    reject(err);
                }

                return resolve(result);
            });
    })
};

module.exports = db;
