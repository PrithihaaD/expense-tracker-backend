# Expense Tracker Backend API

A professional Expense Tracker Backend API built using Node.js, Express.js, MongoDB Atlas, Mongoose, and Swagger Documentation.

---

## Features

- Add Expense
- Get All Expenses
- Get Single Expense
- Search Expenses by Category
- Update Expense
- Delete Expense
- MongoDB Database Integration
- REST API
- Swagger API Documentation
- Render Deployment

---

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Swagger UI
- Swagger JSDoc
- Render
- Postman
- GitHub

---

## Database

MongoDB Atlas is used as the cloud database.

### Database Name
test

### Collection Name
expenses

---

## API Endpoints

### Home Route

GET /

### Create Expense

POST /expense

### Get All Expenses

GET /expense

### Get Single Expense

GET /expense/:id

### Search Expense

GET /search?category=Food

### Update Expense

PUT /expense/:id

### Delete Expense

DELETE /expense/:id

---

## Swagger Documentation

Swagger UI is integrated for API documentation and testing.

### Swagger URL

https://expense-tracker-backend-ader.onrender.com/api-docs

---

## Sample JSON Data

```json
{
  "title": "Netflix Subscription",
  "amount": 199,
  "category": "Entertainment",
  "paymentMethod": "UPI",
  "description": "Monthly subscription",
  "location": "Online",
  "date": "2026-05-21",
  "status": "Paid"
}
```

---

## Live Deployment

Backend deployed using Render.

### Live URL

https://expense-tracker-backend-ader.onrender.com

---

## Author

Prithihaa D
Integrated M.Tech Software Engineering
VIT Chennai
