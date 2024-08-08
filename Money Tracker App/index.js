const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.qxgon.mongodb.net/mydata`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => {
    console.error("Could not connect to MongoDB:", err);
    process.exit(1);
});
const moneySchema = new mongoose.Schema({
    category_select: String,
    amount_input: Number,
    info: String,
    date_input: Date
});

const Expense = mongoose.model("Expense", moneySchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/add", (req, res) => {
    const { category_select, amount_input, info, date_input } = req.body;

    if (!category_select || !amount_input || !info || !date_input) {
        return res.status(400).send("All fields are required");
    }

    const data = new Expense({
        category_select,
        amount_input,
        info,
        date_input: new Date(date_input) 
    });

    data.save((err, result) => {
        if (err) {
            console.error("Error inserting record:", err);
        }
        console.log("Record inserted successfully:", result);
        res.status(201).send("Record added");
    });
});

app.listen(2000, () => {
    console.log("Listening on port 2000");
});
