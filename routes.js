const express = require("express");
const db = require("./database");

const router = express.Router();

// Send message
router.post("/messages", (req, res) => {
  const { conversation_id, sender_id, content } = req.body;

  db.run(
    `INSERT INTO messages (conversation_id, sender_id, content)
     VALUES (?, ?, ?)`,
    [conversation_id, sender_id, content],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

// Get messages
router.get("/conversations/:id/messages", (req, res) => {
  db.all(
    `SELECT * FROM messages
     WHERE conversation_id = ?
     ORDER BY created_at`,
    [req.params.id],
    (err, rows) => res.json(rows)
  );
});

// Mark messages as read
router.post("/conversations/:id/read", (req, res) => {
  const { user_id } = req.body;

  db.run(
    `UPDATE messages
     SET read_at = CURRENT_TIMESTAMP
     WHERE conversation_id = ?
     AND sender_id != ?
     AND read_at IS NULL`,
    [req.params.id, user_id],
    () => res.json({ status: "read" })
  );
});

// Get conversations + unread count
router.get("/conversations", (req, res) => {
  const userId = req.query.user_id;

  db.all(
    `
    SELECT c.id,
    COUNT(m.id) AS unread_count
    FROM conversations c
    LEFT JOIN messages m
      ON m.conversation_id = c.id
      AND m.read_at IS NULL
      AND m.sender_id != ?
    WHERE c.user1_id = ? OR c.user2_id = ?
    GROUP BY c.id
    `,
    [userId, userId, userId],
    (err, rows) => res.json(rows)
  );
});

module.exports = router;
