const fetch = require("node-fetch")

module.exports = async function(ipAddress, options){
    if(!process.env.GEOLOCATION_API_KEY) throw new Error("Missing GEOLOCATION_API_KEY")

    var geoRes = await fetch(`http://api.ipstack.com/${ipAddress}?access_key=${process.env.GEOLOCATION_API_KEY}`, {
        "method": "GET",
    })
    .then(response => response.json())

    if(!geoRes.continent_code) throw new Error("Geolocation failed")

    if(typeof options === "object" && options.stringify){
        return `${city} ${region_name}, ${country_name}`
    }
    else return geoRes
}