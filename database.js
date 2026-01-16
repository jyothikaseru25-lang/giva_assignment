const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("chat.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY,
      user1_id INTEGER,
      user2_id INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY,
      conversation_id INTEGER,
      sender_id INTEGER,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      read_at DATETIME
    )
  `);

  db.run(`INSERT OR IGNORE INTO users VALUES (1, 'User A')`);
  db.run(`INSERT OR IGNORE INTO users VALUES (2, 'User B')`);
  db.run(`INSERT OR IGNORE INTO conversations VALUES (1, 1, 2)`);
});

module.exports = db;
