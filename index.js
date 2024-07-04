const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const authRoutes = require("./routes/auth");
dotenv.config();
const PORT = process.env.PORT;


app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect('mongourl').then(() => "MongoDB connected").catch(err => console.log(err));
});

// password security
// login
// middleware and logging 