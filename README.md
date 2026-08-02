# 🏠 RentNest

RentNest is a full-stack property rental platform that connects **tenants**, **landlords**, and **administrators** in one modern web application. It provides a seamless experience for browsing rental properties, managing rental requests, processing online payments, and administering the platform through role-based dashboards.

---

## 🌐 Live Demo

- **Frontend:** https://rent-nest-frontend-navy.vercel.app
- **Backend API:** https://rent-nest-zeta.vercel.app/api

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Landlord, Tenant)
- Protected routes
- Profile management
- Image upload with ImgBB

---

### 🏡 Property Management
- Browse available properties
- Search properties
- Filter by category
- Property details page
- Add new property
- Update property
- Delete property
- Multiple image upload

---

### 📋 Rental Request System
- Submit rental requests
- Approve or reject requests
- Automatic rejection of other pending requests after approval
- Rental request history

---

### 💳 Online Payments
- Stripe Checkout integration
- Secure online payment
- Payment history
- Payment status tracking

---

### ⭐ Reviews
- Tenants can review rented properties
- Only paid rentals can be reviewed
- Landlords can view reviews of their properties

---

### 👤 Tenant Dashboard
- Dashboard overview
- My rental requests
- Payment history
- Submit reviews
- Profile management

---

### 🏠 Landlord Dashboard
- Dashboard overview
- Manage properties
- Add/Edit/Delete properties
- Manage rental requests
- View property reviews

---

### 🛠️ Admin Dashboard
- Dashboard overview
- Manage users
- Ban / Unban users
- Manage categories
- Monitor rental requests

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Framer Motion
- Date-fns

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Stripe API
- ImgBB API

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/GMRedoan/rent-nest--frontend.git
```

```bash
cd rentnest-client
```

---

### Install dependencies

```bash
npm install
```

---

### Configure environment variables

Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_IMGBB_API_KEY=YOUR_IMGBB_KEY
```

---

### Run the development server

```bash
npm run dev
```

---

## 🔑 Main User Roles

### 👤 Tenant
- Browse properties
- Request rentals
- Make payments
- View payment history
- Submit reviews
- Manage profile

---

### 🏠 Landlord
- Create properties
- Update properties
- Delete properties
- Manage rental requests
- View reviews

---

### 👨‍💼 Admin
- Manage users
- Manage categories
- View all rental requests
- Monitor platform activity

---

## 💳 Payment Flow

1. Tenant submits a rental request.
2. Landlord approves the request.
3. Tenant clicks **Pay Now**.
4. Stripe Checkout opens.
5. Payment is completed.
6. Payment history is updated.

---

## 📸 Image Upload

Property images and profile photos are uploaded through **ImgBB** before being saved in the database.

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop
- Tablet
- Mobile

---

## 🎨 UI Features

- Modern dashboard layouts
- Skeleton loading screens
- Smooth animations using Framer Motion
- Toast notifications
- Responsive tables and cards
- Modal-based forms
- Beautiful empty states

---

## 📦 Major Packages

```json
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Prisma
React Hook Form
Framer Motion
Stripe
date-fns
Lucide React
```

---

## 🔒 Authentication

- JWT Authentication
- HTTP-only cookies
- Protected server actions
- Role-based middleware

---

## 👨‍💻 Author

**GM Redoan**

GitHub: https://github.com/GMRedoan

---

## 📄 License

This project is developed for educational purposes.