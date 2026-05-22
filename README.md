 Krishi Bazzar
A MERN Stack Agricultural Marketplace
Connecting Farmers Directly with Retailers

 Project Purpose
Krishi Bazzar is a full-stack web application built using the MERN stack (MongoDB, Express.js, ReactJS, Node.js). The platform is designed to bridge the gap between farmers and retailers by providing a direct marketplace where farmers can list and sell their agricultural products — including vegetables, fruits, grains, and other goods — without depending on middlemen.
Retailers can browse available products, view farmer profiles, and place orders directly through the platform. The goal is to increase income for farmers and reduce costs for retailers by creating a transparent, efficient, and accessible digital marketplace.

Tech Stack
Frontend
•  ReactJS — Component-based UI development
•  Tailwind CSS — Responsive and utility-first styling
•  React Router DOM — Client-side routing and navigation
•  Axios — HTTP requests to the backend API
•  Redux Toolkit — Global state management
•  Vite — Fast development build tool

Backend
•  Node.js — JavaScript runtime environment
•  Express.js — Web framework for building REST APIs
•  MongoDB — NoSQL database for storing user and product data
•  Mongoose — MongoDB object modelling for Node.js
•  JWT (JSON Web Token) — User authentication and authorization
•  Bcrypt.js — Password hashing for secure storage
•  CORS — Cross-origin resource sharing middleware
•  Dotenv — Environment variable management

 Project Structure
krishi-bazzar/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── store/           # Redux store and slices
│   │   ├── App.jsx          # Main app with routing
│   │   └── main.jsx         # Entry point
│   └── package.json
├── backend/
│   ├── models/              # Mongoose data models
│   ├── routes/              # Express API routes
│   ├── controllers/         # Route handler logic
│   ├── middleware/          # Auth middleware
│   ├── server.js            # Main server file
│   └── .env                 # Environment variables
└── README.md

Setup Instructions
Prerequisites
•  Node.js (v18 or above) installed
•  MongoDB installed locally or a MongoDB Atlas account
•  Git installed on your machine

Step 1 — Clone the Repository
git clone https://github.com/alsonbhandari/krishi-bazzar.git
cd krishi-bazzar

Step 2 — Setup Backend
cd backend
npm install
Create a .env file in the backend folder with the following:
PORT=5000
MONGO_URI=mongodb://localhost:27017/krishibazzar
JWT_SECRET=your_secret_key_here
node server.js

Step 3 — Setup Frontend
cd ../frontend
npm install
npm run dev

Step 4 — Open in Browser
http://localhost:5173

Key Features
•  Farmer registration and login with JWT authentication
•  Farmers can add, edit, and delete product listings (vegetables, fruits, grains)
•  Retailers can browse all available products with category filters
•  Product detail page with farmer contact information
•  Responsive design for mobile and desktop devices
•  Secure password storage using bcrypt hashing
•  Role-based access control — separate views for farmers and retailers
•  Real-time state updates using Redux Toolkit

Developer
Name: Alson Raj Bhandari
Email: ealsonbhandari40@gmail.com
College: Itahari International College, Dulhari
Program: BSc (Hons) Computing — 2nd Year
Module: FC6W51NI Career Development Learning

