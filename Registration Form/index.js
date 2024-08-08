const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ri14ae6.mongodb.net/registationFormDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Registration schema
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Create model from schema
const Registration = mongoose.model("Registration", registrationSchema);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'pages')));

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Handle form submission
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await Registration.findOne({ email: email });
        if (!existingUser) {
            const registrationData = new Registration({
                name,
                email,
                password
            });
    
            await registrationData.save();
            res.redirect("/success");
        } else {
            console.log("User already exists");
            res.redirect("/error");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/error");
    }
});


// Serve success.html
app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'success.html'));
});

// Serve error.html
app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'error.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
