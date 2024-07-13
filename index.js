const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const jobRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");
app.use(cors({
    origin: "*",
}));

// log every incoming request
// store it in a file
app.use((req, res, next) => {
    const log = `${req.method} - ${req.url} - ${req.ip} - ${new Date()}/n`;
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", authMiddleware, jobRoutes);
app.get("/", (req, res) => {
    res.send("Hello World");
});
// error handling middleware
app.use((err, req, res, next) => {
    let log;
    log = err.stack;
    log += `/n${req.method} - ${req.url} - ${req.ip} - ${new Date()}/n`;
    fs.appendFile("error.txt", log, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(500).send("Something went wrong");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect('mongodb+srv://user_001:iQkx70CQfF3hm8PG@cluster0.iefo3jp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => "MongoDB connected").catch(err => console.log(err));
});

