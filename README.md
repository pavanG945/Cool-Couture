# 🛒 Cool Couture E-Commerce Web Application

## 🧠 Overview

Cool Couture is a full-stack e-commerce web application for Indian clothing and accessories. It features user authentication, product browsing, a persistent user cart, and protected checkout/payment routes. The project is organized with separate frontend (React) and backend (Node/Express/MongoDB) folders for maintainability and scalability.

---

## 👨‍💻 Developer

- Gembali Pavan Kumar 
---

## 📌 Problem Statement

Build a secure, scalable, and user-friendly e-commerce platform for Indian ethnic wear. The system should allow users to browse products, manage a personalized cart, register/login securely, and complete purchases with proper authentication and order management.

---

## 📊 Project Structure

```
cool-couture/
├── frontend/   # React app (client)
└── backend/    # Node.js/Express API (server)
```

---

## 📦 Dataset & Features

- **Products**: Name, images, price, description, category
- **Users**: Name, email, password (hashed), order history
- **Cart**: User-specific, persistent in localStorage
- **Orders**: Items, total, user ID, timestamp, status

---

## 🧹 Data Handling & Preprocessing

- Secure password hashing with `bcryptjs`
- JWT-based authentication for protected routes
- User-specific cart (localStorage key includes user ID)
- Input validation on backend for all endpoints

---

## 🧰 Tech Stack

- **Frontend**: React, React Router, Axios, CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Utilities**: dotenv, cors, ESLint, Jest, React Testing Library

---

## 📈 Project Workflow

1. User Registration & Authentication
2. Product Listing & Browsing
3. Cart Management
4. Checkout & Order Placement
5. Order History & User Profile
6. Protected Routes for Authenticated Actions
7. Frontend-Backend Integration

---

## ✅ Results & Insights

- 🔐 **Secure Authentication**: JWT tokens and hashed passwords protect user data
- 🛒 **User-Specific Cart**: Cart is isolated per user and cleared on logout
- 🔏 **Protected Checkout**: Only logged-in users can place orders
- 📱 **Responsive UI**: Works smoothly across desktop and mobile
- 🧹 **Clean Codebase**: Frontend and backend kept modular and maintainable

---

## 🚀 Future Scope

- Integration with payment gateways (Stripe, Razorpay)
- Admin dashboard for product and order management
- Real-time order tracking for users
- Product reviews and ratings
- Enhanced analytics for sales and customer behavior

---

## 📎 References

- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [JWT Introduction](https://jwt.io/)
- [bcryptjs GitHub](https://github.com/dcodeIO/bcrypt.js)

---

## 📝 Example Folder Structure

```
cool-couture/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── server.js
    └── .env
```

---

## 📬 Contact

📧 pavangembali945@gmail.com  
📍 Amrita Vishwa Vidyapeetham, Amaravati
