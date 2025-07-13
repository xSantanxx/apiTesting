const express = require("express");
const axios = require("axios");
const router = express.Router();

//Read the weather API key from .env
const API_KEY = process.env.WEATHER_API_KEY;

//define a GET route at '/'
//the route expects a 'city' query parameter (so like a hashmap)
router.get("/", async(req, res) => {
    const city = req.query.city;

    if(!city){
        return res.status(400).json({error: "City is required"});
    }

    try {

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        console.log(apiKey ? "Found" : "Missing");

        const response = await axios.get(weatherURL);
        const data = response.data;

        const utcSeconds = data.dt + data.timezone;
        const localTime = new Date(utcSeconds * 1000);

        const fullDate = localTime.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

        const geoLink = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geo_response = await axios.get(geoLink);
        const location = geo_response.data[0];

        const state = location.state;
        const country = location.country;

        // //make a GET request to OpenWeatherMap API
        // const response = await axios.get(
        //     `https://api.openweathermap.org/data/2.5/weather`,{
        //         params: {
        //             q: city, //city name
        //             appid: API_KEY, //API key for authentication
        //             units: "imperial",
        //         },
        //     }
        // );
        //extract and send relevant data to the client
        res.json({
            city: data.name,
            state: state,
            country: country,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            description: data.weather[0].description,
            local_date: fullDate,
            icon: data.weather[0].icon,
        });
    }
    catch(error){
        //if the API call fails, respond with a 500 error

        res.status(500).json({error: "City not found or API error"})
    }
});

//export the router so the server can use it
module.exports = router;