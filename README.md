# User Administration API

A backend **User Administration REST API** built with **Node.js, TypeScript, Express.js, MongoDB, PostgreSQL, RabbitMQ, and JWT**.

The project follows **Clean Architecture** and uses an **Event-Driven Architecture** to asynchronously synchronize user data between MongoDB and PostgreSQL through RabbitMQ.

---

## 🚀 Overview

This project provides user authentication and administration functionality with a focus on **scalable backend architecture, separation of concerns, and asynchronous database synchronization**.

### Core functionality

- User Registration
- User Login
- User Logout
- JWT Authentication
- Password Hashing
- Protected Routes
- MongoDB as the primary source of truth
- PostgreSQL for synchronized user data
- RabbitMQ for asynchronous communication
- Background Worker for database synchronization

The application separates the API layer from background processing. MongoDB acts as the primary source of truth, while PostgreSQL is updated asynchronously through RabbitMQ events.

---

## ✨ Features

- 🔐 JWT-based authentication
- 👤 User registration and login
- 🚪 User logout
- 🔒 Protected routes
- 🔑 Secure password hashing
- 🍃 MongoDB as the source of truth
- 🐘 PostgreSQL data synchronization
- 🐇 RabbitMQ message broker
- ⚡ Event-driven architecture
- 🔄 Asynchronous database synchronization
- 🧵 Separate API and Worker processes
- 🏗️ Clean Architecture
- 📦 Repository Pattern
- 💉 Dependency Injection
- 🟦 TypeScript for type safety

---

# 🏗️ Architecture

The project combines **Clean Architecture** with **Event-Driven Architecture**.

### High-Level Architecture

```text
                         ┌─────────────┐
                         │    Client   │
                         └──────┬──────┘
                                │
                                ▼
                       ┌────────────────┐
                       │   REST API     │
                       │   Express.js   │
                       └───────┬────────┘
                               │
                               ▼
                       ┌────────────────┐
                       │  Controllers   │
                       └───────┬────────┘
                               │
                               ▼
                       ┌────────────────┐
                       │    Use Cases   │
                       └───────┬────────┘
                               │
                               ▼
                       ┌────────────────┐
                       │    MongoDB     │
                       │ Source of Truth│
                       └───────┬────────┘
                               │
                         Publish Event
                               │
                               ▼
                       ┌────────────────┐
                       │    RabbitMQ    │
                       │ Message Broker │
                       └───────┬────────┘
                               │
                         Consume Event
                               │
                               ▼
                       ┌────────────────┐
                       │     Worker     │
                       └───────┬────────┘
                               │
                               ▼
                       ┌────────────────┐
                       │  PostgreSQL    │
                       │  Synchronized │
                       │      Data      │
                       └────────────────┘
