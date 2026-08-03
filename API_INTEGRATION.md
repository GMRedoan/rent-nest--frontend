# API Integration

This document maps the frontend pages/components to the backend API endpoints used throughout the RentNest application.

---

# Authentication

| Frontend | Endpoint | Method | Purpose |
|----------|----------|--------|---------|
| Login Page | `/auth/login` | POST | Authenticate user |
| Register Page | `/auth/register` | POST | Create new account |
| Navbar/Profile | `/auth/me` | GET | Get logged-in user |
| Edit Profile Modal | `/auth/:userId` | PATCH | Update user profile |

---

# Properties

| Frontend | Endpoint | Method | Purpose |
|----------|----------|--------|---------|
| Home Page | `/properties` | GET | Fetch all properties |
| Property Details | `/properties/:id` | GET | Fetch single property |
| My Properties | `/landlord/properties` | GET | Fetch landlord properties |
| Add Property Modal | `/properties` | POST | Create property |
| Edit Property Modal | `/landlord/properties/:id` | PATCH | Update property |
| Delete Property Modal | `/landlord/properties/:id` | DELETE | Delete property |

---

# Categories

| Frontend | Endpoint | Method | Purpose |
|----------|----------|--------|---------|
| Category List | `/categories` | GET | Fetch categories |
| Add Category Modal | `/admin/categories` | POST | Create category |
| Edit Category Modal | `/admin/categories/:id` | PATCH | Update category |
| Delete Category Modal | `/admin/categories/:id` | DELETE | Delete category |

---

# Rental Requests

| Frontend | Endpoint | Method | Purpose |
|----------|----------|--------|---------|
| Rental Request Modal | `/rentals` | POST | Submit rental request |
| Tenant Rental History | `/tenant/requests` | GET | Fetch tenant requests |
| Landlord Requests | `/landlord/requests` | GET | Fetch rental requests |
| Update Request Status | `/landlord/requests/:id` | PATCH | Approve/Reject request |
| Admin Requests | `/admin/requests` | GET | View all rental requests |

---

# Payments

| Frontend | Endpoint | Method | Purpose |
|----------|----------|--------|---------|
| Pay Now Button | `/payments/create` | POST | Create Stripe checkout session |
| Payment History | `/payments/history` | GET | Fetch payment history |

---

# Reviews

| Frontend | Endpoint | Method | Purpose |
|----------|----------|--------|---------|
| Review Page | `/tenant/reviews` | GET | Fetch reviewable rentals |
| Submit Review Modal | `/reviews` | POST | Submit property review |
| Landlord Reviews | `/landlord/reviews` | GET | Fetch reviews for landlord properties |

---

# Users (Admin)

| Frontend | Endpoint | Method | Purpose |
|----------|----------|--------|---------|
| User Management | `/admin/users` | GET | Fetch all users |
| Update User Status | `/admin/users/:id` | PATCH | Ban/Unban user |

---

# Dashboard

## Tenant Dashboard
- Uses authenticated user information.
- Displays rental history, payment history, reviews, and profile.

## Landlord Dashboard
- Displays landlord properties.
- Displays rental requests.
- Displays property reviews.
- Property management (Add/Edit/Delete).

## Admin Dashboard
- Displays platform overview.
- User management.
- Property category management.
- Rental request monitoring.

---

# Image Upload

| Utility | Purpose |
|---------|---------|
| `uploadImage()` | Uploads images to Cloudinary and returns a public URL |

Used in:
- Edit Profile
- Add Property
- Edit Property

---

# Server Action Pattern

Each server action follows a consistent structure:

```ts
const result = await action(payload);

if (result.success) {
    // success flow
} else {
    // error handling
}
```

Server actions internally use:

- `serverFetch.get()`
- `serverFetch.post()`
- `serverFetch.patch()`
- `serverFetch.delete()`

which automatically include the authenticated user's access token from cookies.

---

# Authentication Flow

1. User logs in.
2. Backend returns JWT.
3. JWT is stored in an HTTP-only cookie.
4. `serverFetch` attaches the token automatically.
5. Protected routes use the cookie for authentication.

---

# Common Response Format

All API responses follow a consistent structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {}
}
```