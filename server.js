const express = require("express");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());

/* ---------------- SWAGGER ---------------- */

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Expense Tracker API",
            version: "1.0.0",
            description: "API documentation for the Expense Tracker backend"
        },
        servers: [
            {
                // url: "http://localhost:3000",
                url: "https://expense-tracker-backend-ader.onrender.com",
                description: "Local development server"
            }
        ]
    },
    apis: [__filename]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-docs.json", (req, res) => {
    res.json(swaggerSpec);
});

/* ---------------- HOME ROUTE ---------------- */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check whether the backend is running
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Backend is running
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
app.get("/", (req, res) => {
    res.send("Expense Tracker Backend Running");
});

/* ---------------- MONGODB CONNECTION ---------------- */

mongoose.connect("mongodb://prithihaad2024_db_user:student123@ac-7hn6isx-shard-00-00.hibtotj.mongodb.net:27017,ac-7hn6isx-shard-00-01.hibtotj.mongodb.net:27017,ac-7hn6isx-shard-00-02.hibtotj.mongodb.net:27017/?ssl=true&replicaSet=atlas-9c3uo7-shard-0&authSource=admin&appName=Cluster0")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

/* ---------------- SCHEMA ---------------- */

const expenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    category: String,
    paymentMethod: String,
    description: String,
    location: String,
    date: String,
    status: String
});

/* ---------------- MODEL ---------------- */

const Expense = mongoose.model("Expense", expenseSchema);

/* ================================================= */
/* ==================== CRUD ======================= */
/* ================================================= */

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Grocery shopping
 *         amount:
 *           type: number
 *           example: 1200
 *         category:
 *           type: string
 *           example: Food
 *         paymentMethod:
 *           type: string
 *           example: UPI
 *         description:
 *           type: string
 *           example: Weekly groceries
 *         location:
 *           type: string
 *           example: Chennai
 *         date:
 *           type: string
 *           example: 2026-05-21
 *         status:
 *           type: string
 *           example: paid
 *     ExpenseResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/Expense'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 664c1b2f4a3b2f0012345678
 */

/* -------- CREATE EXPENSE -------- */

/**
 * @swagger
 * /expense:
 *   post:
 *     summary: Create a new expense
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Expense added successfully
 *       500:
 *         description: Server error
 */
app.post("/expense", async (req, res) => {

    const expense = new Expense(req.body);

    await expense.save();

    res.status(201).json({
        message: "Expense Added",
        data: expense
    });

});

/* -------- GET ALL EXPENSES -------- */

/**
 * @swagger
 * /expense:
 *   get:
 *     summary: Get all expenses
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: List of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExpenseResponse'
 */
app.get("/expense", async (req, res) => {

    const expenses = await Expense.find();

    res.status(200).json(expenses);

});

/* -------- GET SINGLE EXPENSE -------- */

/**
 * @swagger
 * /expense/{id}:
 *   get:
 *     summary: Get a single expense by ID
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense record
 *       404:
 *         description: Expense not found
 */
app.get("/expense/:id", async (req, res) => {

    const id = req.params.id;

    const expense = await Expense.findById(id);

    res.status(200).json(expense);

});

/* -------- SEARCH BY CATEGORY -------- */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search expenses by category
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         example: Food
 *     responses:
 *       200:
 *         description: Matching expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExpenseResponse'
 */
app.get("/search", async (req, res) => {

    const category = req.query.category;

    const expenses = await Expense.find({
        category: category
    });

    res.status(200).json(expenses);

});

/* -------- UPDATE EXPENSE -------- */

/**
 * @swagger
 * /expense/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       404:
 *         description: Expense not found
 */
app.put("/expense/:id", async (req, res) => {

    const id = req.params.id;

    const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    res.status(200).json({
        message: "Expense Updated",
        data: updatedExpense
    });

});

/* -------- DELETE EXPENSE -------- */

/**
 * @swagger
 * /expense/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */
app.delete("/expense/:id", async (req, res) => {

    const id = req.params.id;

    await Expense.findByIdAndDelete(id);

    res.status(200).json({
        message: "Expense Deleted"
    });

});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
