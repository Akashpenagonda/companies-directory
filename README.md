<h1 align="center">🚀 Companies Directory — Futuristic React Application</h1>

<p align="center">
  A modern, animated, futuristic platform to explore verified companies with filters, search, sorting, pagination, and blazing UI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Framer%20Motion-Animation-F20089?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JSON--Server-Mock%20API-orange?style=for-the-badge" />
</p>

---

🚀 Live Demo

🔗 Netlify: https://frontlinesedu.netlify.app/

# 🌟 **Project Overview**

Companies Directory is a fast, modern, and fully responsive React.js web application designed as part of a Frontend Developer Assignment for Frontlines Media.
It demonstrates real-world skills in:

Modern UI/UX

API integration

Search + filtering

Sorting + pagination

Optimized performance

Clean architecture and reusability

The project includes a local json-server backend for development and a static JSON fallback for production environments such as Netlify, ensuring seamless functionality everywhere.

---

# ✨ **Key Highlights**

### 🎯 **Powerful Features**
- 🔍 Real-time search with debounce  
- 🌍 Filter by Location  
- 🏭 Filter by Industry  
- ↕ Sorting (A → Z & Z → A)  
- 📄 Advanced Pagination  
- 🎛 Reset All Filters button  
- ⚠ Beautiful Empty-State Screens  
- 🌀 Loading Skeleton Shimmer  
- ☀️🌙 Dark Mode (Saved in localStorage)  

### 💫 **Advanced UI/UX Enhancements**
- 🌈 Futuristic gradients + neon blur lighting  
- 🎭 Smooth animations with Framer Motion  
- 🌀 3D Tilt Hover Cards  
- 🌬️ Glassmorphism panels  
- 📱 Fully responsive from mobile → desktop  

---

# 🖥️ **Screens You’ll Love**

### 🧭 Hero Section  
- Floating title animation  
- Neon blurred glow background  
- Smooth entrance transitions  

### 🗂️ Companies Grid  
- Interactive 3D cards  
- Clean layout  
- Elegant typography  

### 🛠 Filters & Controls  
- Glass UI with soft shadows  
- Reset button  
- Intuitive dropdowns  

---

Tech Stack :

| Technology          | Purpose                       |
| ------------------- | ----------------------------- |
| **React.js (Vite)** | Fast, modular UI              |
| **Tailwind CSS**    | Utility-first, modern styling |
| **Framer Motion**   | Animations & transitions      |
| **json-server**     | Local REST API                |
| **Axios**           | API communication             |
| **Netlify**         | Production hosting            |
| **JavaScript ES6+** | Core logic                    |



📂 File Structure :

📦 companies-directory
│
├── public/
│   ├── companies.json         # Production data source
│
├── src/
│   ├── components/
│   │   ├── Filters.jsx        # Search, filter, sort controls
│   │   ├── CompanyCard.jsx    # 3D card with hover tilt
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Pagination.jsx
│   │
│   ├── pages/
│   │   └── Home.jsx           # Main view containing hero & grid
│   │
│   ├── services/
│   │   └── api.js             # Smart local/prod API handler
│   │
│   ├── utils/
│   │   └── useDebounce.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── db.json                    # Local dev database (json-server)
├── package.json
├── tailwind.config.js
└── README.md

▶️ Run Locally
1️⃣ Install dependencies :

npm install


2️⃣ Start JSON Server :

 json-server --watch db.json --port 4000

3️⃣ Start frontend :

npm run dev
 



🧑‍💻 Developed By
Akash Penagonda

🚀 Passionate FUll Stack Developer
📍 India