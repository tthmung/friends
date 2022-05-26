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

// Get a specfied event
db.getEventById = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM events WHERE id=?', [id], (err, result) => {
            if (err) {
                reject(err);
            }
            return resolve(result);
        });
    });
};

// Check if a user already join an event
db.checkJoin = (id, email) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM joins WHERE id=? AND email=?', [id, email], (err, result) => {
            if (err) {
                reject(err);
            }

            return resolve(result);
        })
    });
};

// Join a specific event
db.joinEvent = (id, email, comment) => {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO joins(id, email, comment) VALUES (?, ?, ?)', [id, email, comment], (err, result) => {
            if (err) {
                reject(err);
            }
            con.query('UPDATE events SET sign_up=sign_up + 1 WHERE id=?', [id]);
            return resolve(result);
        });
    });
};

// Leave an event
db.leaveEvent = (id, email) => {
    return new Promise((resolve, reject) => {
        con.query('DELETE FROM joins WHERE id = ? AND email = ?', [id, email], (err, result) => {
            if (err) {
                reject(err);
            }
            con.query('UPDATE events SET sign_up=sign_up - 1 WHERE id=?', [id]);
            return resolve(result);
        });
    });
};

// Get the list of users that signed up an event
db.getSignedUpUsers = (id) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM joins WHERE id = ?', [id], (err, result) => {
            if (err) {
                reject(err);
            }
            return resolve(result);
        });
    });
};

// Report an event
db.reportEvent = (id, email, comment) => {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO reports (id, email, comment) VALUES(?, ?, ?)', [id, email, comment], (err, result) => {
            if (err) {
                reject(err);
            }

            con.query('UPDATE events SET reported=reported + 1 WHERE id = ?', [id]);

            return resolve(result);
        });
    })
}

// Get sepecfic user information
db.getUserInfo = (email) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT email, name, introduction FROM users WHERE email = ?', [email], (err, result) => {
            if (err) {
                reject(err);
            }

            return resolve(result);
        });
    });
}

// Get the events created by the user
db.getMyEvents = (email) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM events WHERE email = ?', [email], (err, result) => {
            if (err) {
                reject(err);
            }

            return resolve(result);
        });
    });
}

// Return the events joined by the user
db.getJoinedEvent = (email) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT e.id id, e.email email, title, description, time, location, slots, category, reported, date_created FROM joins j JOIN events e WHERE e.id = j.id && j.email = ?',
            [email], (err, result) => {
                if (err) {
                    reject(err);
                }

                return resolve(result);
            });
    });
}

module.exports = db;
