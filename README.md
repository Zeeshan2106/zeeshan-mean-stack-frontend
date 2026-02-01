# MEAN Stack Interview – Frontend Application

**Candidate:** Zeeshan Raza  
**Email:** [recruitment@atdrive.com](mailto:recruitment@atdrive.com)  
**Repository:** Frontend Client (Angular)

---

## 🎯 Overview

This is the **frontend application** for the MEAN Stack Interview assignment, built using **Angular**. It consumes the RESTful backend API and demonstrates clean UI structure, API integration, and standard Angular best practices.

The application allows users to:

* Register and log in
* Manage products (CRUD)
* Place and view orders
* Fetch real-time weather information via backend integration

---

## 🧱 Tech Stack

* **Framework:** Angular
* **Language:** TypeScript
* **Styling:** CSS / Angular styles
* **HTTP Client:** Angular HttpClient
* **Architecture:** Component-based, service-driven

---

## 🏗️ Application Architecture

### Key Concepts

* **Components** handle UI rendering
* **Services** manage API communication
* **Models/Interfaces** define data structures
* **Environment configs** manage API URLs

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/        # UI components
│   │   ├── services/          # API service layer
│   │   ├── models/            # Interfaces / models
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── environments/
│   │   ├── environment.ts     # Development config
│   │   └── environment.prod.ts
│   └── main.ts
├── angular.json
├── package.json
└── README.md
```

---

## ✨ Features Implemented

### ✅ Authentication

* User registration
* User login
* API-based authentication flow
* Error handling for invalid credentials

---

### ✅ Product Management

* View all products
* Add new product
* Edit existing product
* Delete product
* Real-time API integration

---

### ✅ Order Management

* Create new orders
* Select products dynamically
* Auto-calculated order totals (via backend)
* View list of orders

---

### ✅ Weather Information

* City-based weather search
* Weather data fetched via backend API
* Displays temperature and conditions

---

## 🔌 API Integration

The frontend communicates with the backend REST API using Angular services.

Example base URL:

```
http://localhost:3000/api
```

All API calls are centralized inside service classes to maintain clean separation of concerns.

---

## 🚀 Getting Started

### Prerequisites

* Node.js **v18+**
* Angular CLI **v16+**
* Backend API running locally

---

### Installation

```bash
git clone https://github.com/Zeeshan2106/zeeshan-mean-stack-frontend.git
cd zeeshan-mean-stack-frontend
npm install
```

---

### Environment Configuration

Update `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

---

### Run Application

```bash
ng serve
```

Application will be available at:

```
http://localhost:4200
```

---

## 🧪 Testing the App

1. Start backend server
2. Start frontend Angular app
3. Register a user
4. Login
5. Create products and orders

---

## 📌 Best Practices Followed

* Modular folder structure
* Reusable services
* Centralized API handling
* Environment-based configuration
* Clean and readable code

---

## 📄 License

This project is created strictly for **technical interview evaluation purposes**.
