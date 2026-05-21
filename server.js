const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

/* ---------------- HOME ROUTE ---------------- */

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

/* -------- CREATE EXPENSE -------- */

app.post("/expense", async (req, res) => {

    const expense = new Expense(req.body);

    await expense.save();

    res.status(201).json({
        message: "Expense Added",
        data: expense
    });

});

/* -------- GET ALL EXPENSES -------- */

app.get("/expense", async (req, res) => {

    const expenses = await Expense.find();

    res.status(200).json(expenses);

});

/* -------- GET SINGLE EXPENSE -------- */

app.get("/expense/:id", async (req, res) => {

    const id = req.params.id;

    const expense = await Expense.findById(id);

    res.status(200).json(expense);

});

/* -------- SEARCH BY CATEGORY -------- */

app.get("/search", async (req, res) => {

    const category = req.query.category;

    const expenses = await Expense.find({
        category: category
    });

    res.status(200).json(expenses);

});

/* -------- UPDATE EXPENSE -------- */

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

app.delete("/expense/:id", async (req, res) => {

    const id = req.params.id;

    await Expense.findByIdAndDelete(id);

    res.status(200).json({
        message: "Expense Deleted"
    });

});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});