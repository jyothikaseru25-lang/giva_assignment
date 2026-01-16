# Simple Chat Application with Message Read Status

## Objective
This project implements a simple chat application that allows two users to exchange messages and tracks whether those messages have been read. The focus is on backend logic, database design, API design, and correct read/unread state management. A minimal UI is included only to demonstrate correct behavior.

---

## Scope and Assumptions
- Exactly two users are supported
- Only one conversation exists between the users
- No authentication or authorization
- UI is minimal and functional, not visually polished

---

## Tech Stack
- Backend: Node.js with Express
- Database: SQLite
- Frontend: HTML, CSS, Vanilla JavaScript
- Development Tools: VS Code, Nodemon

---

## Functional Requirements

### Users
- Two users (User A and User B) are pre-seeded in the database

### Conversations
- A single conversation exists between the two users
- Each user can view unread message count

### Messages
- Users can send text messages
- Messages are stored in the database
- Each message contains sender ID, content, timestamp

### Message Read Status
- Messages sent by the other user are unread by default
- Opening the conversation marks unread messages as read
- Unread count is calculated per user

---

## Database Design

### Read Status Strategy
**Option A: Read timestamp on messages**

- `read_at = NULL` → message is unread
- `read_at != NULL` → message is read

When a conversation is opened, all unread messages sent by the other user are updated with a read timestamp.

### Tables
- **users**: id, name
- **conversations**: id, user1_id, user2_id
- **messages**: id, conversation_id, sender_id, content, created_at, read_at

---

## API Design

### HTTP Methods
- **GET**: Retrieve data from server
- **POST**: Send data or update state

### Endpoints
- **POST /messages** – Send a new message
- **GET /conversations?user_id=1** – Get unread message count
- **GET /conversations/1/messages** – Fetch messages
- **POST /conversations/1/read** – Mark messages as read

All APIs are implemented in `routes.js`.

---

## UI Behavior
- User can switch between User A and User B
- Conversation is hidden by default
- Conversation opens only when clicked
- Opening a conversation marks messages as read
- Switching user closes the conversation view

---

## Complete Setup and Initialization 

### Prerequisites
- Node.js (LTS) installed
- Visual Studio Code installed

---
### Step 1: Clone the Repository

-in bash
  git clone <your-github-repo-url>
  cd simple-chat-app

---
### Step 2: Install Dependencies

-in bash
  npm install express sqlite3
  npm install --save-dev nodemon

This installs all required packages and creates the node_modules folder.

---
### Step 3: Start the Server

-in bash
  npx nodemon server.js

The server will start at:
http://localhost:3000

---  
### Step 4: Open the Application

Open a web browser and go to:
http://localhost:3000

