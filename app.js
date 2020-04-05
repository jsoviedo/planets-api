const express = require('express');
const app = express();
const mongoose = require('mongoose');

const atpswd = process.env.ATLAS_PSWRD;
const url = "mongodb+srv://joan:"+ atpswd + "@cluster0-9ztll.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

module.exports = app;