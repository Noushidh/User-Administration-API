# User Administration API

A backend User Administration API built with **Node.js, TypeScript, Express.js, MongoDB, PostgreSQL, RabbitMQ, and JWT**.

The project follows **Clean Architecture** and uses an **Event-Driven Architecture** to synchronize user data between MongoDB and PostgreSQL through RabbitMQ.

---

## 🚀 Overview

This project provides user authentication and administration functionality including:

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

The main architectural goal is to keep the business logic independent from external technologies while using asynchronous events to synchronize data between databases.

---

## ✨ Features

- 🔐 JWT-based authentication
- 👤 User registration and login
- 🚪 User logout
- 🔒 Protected API routes
- 🔑 Password hashing
- 🍃 MongoDB as the source of truth
- 🐘 PostgreSQL for synchronized data
- 🐇 RabbitMQ message broker
- ⚡ Event-driven database synchronization
- 🏗️ Clean Architecture
- 📦 Repository Pattern
- 💉 Dependency Injection
- 🔄 Asynchronous background processing
- 🧵 Separate API and Worker processes
- 🟦 TypeScript for type safety

---

# 🏗️ Architecture

The project combines **Clean Architecture** and **Event-Driven Architecture**.

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
                       │  Synchronized  │
                       │      Data      │
                       └────────────────┘
