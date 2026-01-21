# 🛍️ AURA STORE - Premium Cyberpunk E-Commerce

**Day 25 of the 45-Day Coding Challenge**

A next-generation e-commerce application featuring a cinematic UI, parallax effects, and smooth animations. Built with the MERN stack to deliver a premium shopping experience.

👉 **[View Live Demo](https://day25-mini-ecommerce-bwse.vercel.app/)**

---

## ✨ Key Features

* **Cinematic Experience:** Immersive landing page with parallax scrolling and floating elements.
* **Smart Cart Logic:** Real-time quantity updates; items auto-remove at zero quantity.
* **Dynamic Data:** Products fetched dynamically from MongoDB.
* **Admin Tools:** One-click options to **Reset Store** or **Initialize Demo Data**.
* **Simulated Checkout:** Complete order flow with form validation.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Deployment:** Vercel (Frontend), Render (Backend)

---

## 💻 Local Setup

```bash
# 1. Clone Repository
git clone [https://github.com/VYANKEE/day25-mini-ecommerce.git](https://github.com/VYANKEE/day25-mini-ecommerce.git)

# 2. Setup Backend
cd backend
npm install
# Create .env file: MONGO_URI=your_url, PORT=5000
npm run dev

# 3. Setup Frontend
cd frontend
npm install
npm run dev
