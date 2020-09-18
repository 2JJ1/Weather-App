require("dotenv").config()
const express = require("express")
const moment = require("moment")
const RequestForecast = require("./requestforecast")
const app = express()

app.set("views", "views")
app.set("view engine", "ejs")
app.use(express.static("public"))

const cities = ["manila", "moscow", "chicago", "tokyo", "hong kong", "san francisco"] 

app.get("/", async (req, res) => {
    try {
        //Where to get the weather information for
        var {location} = req.query

        //If a location was not specified, choose a random one from the list
        if(!location) location = cities[Math.floor(Math.random() * cities.length)]
        
        //Find the weather for the specified location
        const weather = await RequestForecast(location)

        //Check if the location was understood
        if(!Object.keys(weather.location).length) throw "Invalid location"

        //Check if the location has observations
        if(!weather.forecasts.length) throw "There are no observations for this location"

        //Check if it is day time (Default to true if the observations can't be seen)
        const sunSet = Date.parse(moment(weather.current_observation.astronomy.sunset, "LT").format())
        const isDay = weather.current_observation.pubDate*1000 < sunSet

        //Render the page
        res.render("index", {weather, isDay, GCAPI: process.env.GOOGLE_CLOUD_API_KEY})
    }
    catch(e){
        //Temporary display for "safe" errors
        if(typeof e === "string") return res.send(e)

        console.error(e)
        res.send("Server error")
    }
})

app.listen(process.env.PORT, ()=>console.log(`Weather app started on port ${process.env.PORT}`))