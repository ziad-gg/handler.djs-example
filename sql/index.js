const sqlite3 = require('sqlite3');
const mkdirp = require('mkdirp');
const waitFor = require('node:timers/promises').setTimeout
mkdirp.sync('./data/db');

const db = new sqlite3.Database('./data/db/Users.db');

db.serialize(() => {

    db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      UserId INTEGER PRIMARY KEY,
      GuildId INTEGER,
      username TEXT,
      Coins INTEGER
    )
  `);

});

function addUser(userId, guildId, username, coins) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Users (UserId, GuildId, username, Coins) VALUES (?, ?, ?, ?);`;
        const values = [userId, guildId, username, coins];
        db.run(sql, values, function (err) {
            if (err) {
                reject(err);
            } else {
                console.log(`Inserted user ${userId} into the Users table with row ID ${this.lastID}`);
                resolve({ UserId: userId, GuildId: guildId, username: username, Coins: coins });
            }
        });
    });
};

function getUser(userId, guildId) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Users WHERE UserId = ? AND GuildId = ?`;
        const values = [userId, guildId];
        db.get(sql, values, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

function updateUser(userId, guildId, updateObj) {
    let updateString = '';
    const values = [];

    Object.keys(updateObj).forEach((key, index) => {
        updateString += `${key} = ?`;
        if (index < Object.keys(updateObj).length - 1) {
            updateString += ', ';
        }
        values.push(updateObj[key]);
    });

    // Construct the SQL statement and run the query
    const sql = `UPDATE Users SET ${updateString} WHERE UserId = ? AND GuildId = ?`;
    values.push(userId);
    values.push(guildId);

    return new Promise((resolve, reject) => {
        db.run(sql, values, function (err) {
            if (err) {
                reject(err.message);
            } else {
                const sql2 = `SELECT * FROM Users WHERE UserId = ? AND GuildId = ?`;
                db.get(sql2, [userId, guildId], (err, row) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(row);
                    }
                });
            }
        });
    });
};

module.exports = {
    getUser,
    addUser,
    updateUser,
}