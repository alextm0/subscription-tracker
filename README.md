# 📌 Subscription Management API

## **🚀 Overview**
The **Subscription Management API** is a robust, production-ready backend system built with **Node.js, Express.js, and MongoDB**. It provides a scalable architecture to manage subscription-based services, ensuring **secure authentication, automated reminders, and workflow management**.

## **⚙️ Tech Stack**
- **Node.js** – Backend runtime environment
- **Express.js** – Web framework for API development
- **MongoDB & Mongoose** – NoSQL database and schema modeling
- **JWT Authentication** – Secure authentication & authorization
- **Upstash** – Workflow automation for subscription reminders
- **Arcjet** – Security & rate limiting for API protection

## **🔋 Features**
- ✅ **User Authentication** – JWT-based authentication with secure token handling
- ✅ **Subscription Management** – Create, update, delete, and retrieve subscriptions
- ✅ **Automated Reminders** – Smart email reminders using Upstash workflows
- ✅ **Advanced Security** – Arcjet integration for bot protection and rate limiting
- ✅ **Error Handling & Logging** – Centralized error handling and structured logging

## **🛠️ Installation & Setup**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/subscription-management-api.git
cd subscription-management-api
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root of your project and add:
```env
PORT=5500
SERVER_URL="http://localhost:5500"

# Database
DB_URI=your_mongodb_connection_string

# JWT Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN="1d"

# Arcjet Security
ARCJET_KEY=your_arcjet_key
ARCJET_ENV="development"

# Upstash Workflow
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your_upstash_token

# Email Service
EMAIL_PASSWORD=your_email_password
```

### **4️⃣ Run the Server**
```sh
npm run dev
```
Your API should now be running at `http://localhost:5500`.

## **📌 API Endpoints**

### **🔑 Authentication**
| Method | Endpoint                | Description       |
|--------|-------------------------|------------------|
| POST   | `/api/v1/auth/sign-up`  | Register a new user |
| POST   | `/api/v1/auth/sign-in`  | Login & get token |
| POST   | `/api/v1/auth/sign-out` | Logout user |

### **📅 Subscription Management**
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| POST   | `/api/v1/subscriptions`  | Create a subscription |
| GET    | `/api/v1/subscriptions`  | Get all subscriptions |
| GET    | `/api/v1/subscriptions/:id` | Get subscription by ID |
| PUT    | `/api/v1/subscriptions/:id` | Update subscription |
| DELETE | `/api/v1/subscriptions/:id` | Delete subscription |

### **⏳ Subscription Reminders (Upstash)**
| Method | Endpoint                                  | Description |
|--------|------------------------------------------|-------------|
| POST   | `/api/v1/workflows/subscription/reminder` | Trigger subscription reminder workflow |

## **🕸️ Sample JSON for Subscription**
```json
{
  "name": "CodeWiki - Competitive Programming Course v2",
  "price": 199.99,
  "currency": "usd",
  "frequency": "monthly",
  "category": "education",
  "paymentMethod": "credit card",
  "startDate": "2024-02-01T00:00:00.000Z",
  "user": "65a6b6f95d1e3f001a2f5b20"
}
```

## **📄 License**
This project is licensed under the **MIT License**.

## **📩 Contact**
For issues or contributions, feel free to create an issue or reach out.

---
**🚀 Happy Coding!**

