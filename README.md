# Real-Time Chat Backend

An Express.js + Socket.io backend service powering real-time communication between a public chat interface and an administrative dashboard.

This service handles message transport, persistence, and authentication logic.

---

## 🚀 Overview

This backend provides the real-time infrastructure used by:

- Public Chat Frontend (micro-frontend)
- Personal Dashboard (admin interface)

It enables bidirectional communication using WebSockets while maintaining structured message storage in MongoDB.

---

## ⚙️ Core Responsibilities

- Handle WebSocket connections via Socket.io
- Authenticate administrative connections
- Persist chat messages in MongoDB
- Emit real-time events between clients
- Structure API routes using modular middleware

---

## 🧠 Architecture

The backend follows a modular Express structure:

- Routes
- Controllers
- Middleware
- Models (MongoDB schemas)
- Socket event handlers

WebSocket communication is handled through Socket.io, enabling real-time event emission between:

- Public clients
- Admin dashboard interface

---

## 🔐 Authentication

- Admin authentication is validated before granting privileged socket access.
- Middleware ensures protected routes remain secure.
- Public users connect with restricted permissions.

---

## 💬 Message Flow

1. Public user sends message.
2. Message is validated and stored in MongoDB.
3. Socket.io emits event to connected admin client.
4. Admin response is stored and emitted back to public client.

This ensures synchronized communication between both interfaces.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Socket.io
- MongoDB
- Mongoose
- TypeScript (if applicable)

---

## 🔗 Related Projects

- Personal Dashboard (Admin Interface): [[GitHub Link]](https://github.com/hri-gh/personal-dashboard.git)
- Public Chat Frontend: [[GitHub Link]](https://github.com/hri-gh/live-chat-client.git)

---

## 📌 Notes

This backend focuses on structured real-time communication and modular architecture. It is designed for clarity and maintainability rather than large-scale distributed deployment.
