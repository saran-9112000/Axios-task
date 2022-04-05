require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');




// create express app
const app = express();



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');
const routes = require(
    './app/routes/coupon.routes.js',
    './app/routes/banner.routes.js'
    );
// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
app.use('/', routes);
mongoose.connect(
    process.env.MONGODB_URI,
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connected")
    }
);