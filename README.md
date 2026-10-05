# User Administration API

A backend **User Administration REST API** built with **Node.js, TypeScript, Express.js, MongoDB, PostgreSQL, RabbitMQ, and JWT**.

The project follows **Clean Architecture** and uses an **Event-Driven Architecture** to asynchronously synchronize user data between MongoDB and PostgreSQL through RabbitMQ.


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

## 🏗️ Architecture

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
```

## 🧱 Clean Architecture

The project follows **Clean Architecture** to keep the application modular, maintainable, testable, and independent from external frameworks and infrastructure.

The application is divided into four main layers:

### Presentation Layer

Responsible for handling HTTP requests and responses.

- Routes
- Controllers
- Middleware
- Request validation

### Application Layer

Contains the application's use cases and business workflows.

- Use Cases
- DTOs
- Interfaces

### Domain Layer

Contains the core business rules and domain models.

This layer is independent of frameworks, databases, and external services.

### Infrastructure Layer

Contains implementations for external technologies and services.

- MongoDB
- PostgreSQL
- RabbitMQ
- JWT
- Password hashing
- Repository implementations
- Dependency Injection

### Dependency Flow

```text
Presentation
     │
     ▼
Application
     │
     ▼
Domain
     ▲
     │
Infrastructure
```

## 🔄 Database Synchronization

MongoDB acts as the **primary source of truth** for user data.

When user data is created or updated, an event is published to **RabbitMQ**. The background worker consumes the event and synchronizes the data with PostgreSQL.

```text
MongoDB
   │
   │ Publish Event
   ▼
RabbitMQ
   │
   │ Consume Event
   ▼
Worker
   │
   ▼
PostgreSQL

This asynchronous approach keeps the API independent from the PostgreSQL synchronization process and allows database synchronization to happen in the background.
```
## 🔐 Authentication

The application uses **JWT-based authentication** with **bcrypt password hashing** and secure authentication cookies.

### Authentication Flow

```text
Client
   │
   ▼
Register / Login
   │
   ▼
Validate Credentials
   │
   ▼
Hash / Verify Password
   │
   ▼
Generate JWT
   │
   ▼
HTTP-Only Cookie
   │
   ▼
Protected Routes
   │
   ▼
JWT Verification Middleware
```
## 📂 Project Structure

```text
src/
│
├── application/
│   ├── dtos/
│   ├── interfaces/
│   └── use-cases/
│
├── domain/
│
├── infrastructure/
│   ├── container/
│   ├── database/
│   │   ├── mongodb/
│   │   └── postgres/
│   ├── rabbitmq/
│   └── services/
│
├── presentation/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   └── schemas/
│
├── types/
│
├── app.ts
├── server.ts
└── worker.ts
```
## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Backend runtime |
| **TypeScript** | Type safety |
| **Express.js** | REST API framework |
| **MongoDB** | Primary user data store |
| **PostgreSQL** | Synchronized relational database |
| **RabbitMQ** | Asynchronous message broker |
| **JWT** | Authentication |
| **bcrypt** | Password hashing |
## ⚙️ Environment Variables

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate a user |
| `POST` | `/api/auth/logout` | Logout the authenticated user |


Create a `.env` file in the project root and configure the required environment variables:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

NODE_ENV=development

JWT_SECRET=your_jwt_secret

PG_HOST=localhost
PG_PORT=5432
PG_USER=your_postgres_user
PG_PASSWORD=your_postgres_password
PG_DATABASE=user_administration

DATABASE_URL=your_prisma_database_url
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later)
- **npm**
- **MongoDB**
- **PostgreSQL**
- **RabbitMQ**
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Noushidh/<your-repository>.git
```

### 2. Navigate to the Project

```bash
cd <your-repository>
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and add the required environment variables.

See the [Environment Variables](#-environment-variables) section above.

### 5. Start Required Services

Make sure the following services are running:

- MongoDB
- PostgreSQL
- RabbitMQ

### 6. Start the API Server

```bash
npm run dev
```

### 7. Start the Worker

Open another terminal in the project directory and run:

```bash
npm run worker
```

The application runs using two processes:

- **API Server** — handles HTTP requests.
- **Worker** — consumes RabbitMQ events and synchronizes data with PostgreSQL.

## 📦 Production Build

Build the TypeScript application for production:

```bash
npm run build
```

Start the production API server:

```bash
npm start
```

Start the background worker in a separate process:

```bash
npm run worker
```

The production environment requires the following services to be available:

- MongoDB
- PostgreSQL
- RabbitMQ

Make sure the required environment variables are configured before starting the application.

> Use the exact npm scripts defined in `package.json`.

## 👨‍💻 Author

**Noushidh**

Backend Developer focused on building scalable, maintainable, and well-structured backend systems.

🌐 **Portfolio:**  
https://noushidh.shop/

## 📄 License

This project was created for learning and portfolio purposes.

