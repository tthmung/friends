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

db.register = (email, password, fullname, introduction) => {
    return new Promise((resolve, reject)=>{
        con.query("INSERT INTO users(email, password, name, introduction) VALUES (?, SHA2(?, 256), ?, ?)",
        [email, password, fullname, introduction],
        (err, result) => {
          if (err) reject(err);

          return resolve(result);
        });
    });
};

db.checkUser = (email, password) => {
    return new Promise((resolve, reject)=>{
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

module.exports = db;
