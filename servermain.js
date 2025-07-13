//required modules
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express(); //creates an express application

//use cors middleware so the frontend can call this API
app.use(cors());

//use port from .env or default to 3000
const PORT = process.env.PORT || 3000;

//Basic test route to confirm server is working
app.get("/", (req, res) => {
    res.send("Weather API is running");
});

//import and use the weather route defined in a seperate file
const weatherRoute = require("./temp/weathermain.js");

//all weather routes will start with /api/weather
app.use("/api/weather", weatherRoute);

//start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});