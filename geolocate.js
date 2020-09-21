const fetch = require("node-fetch")

module.exports = async function(ipAddress, options){
    if(!process.env.GEOLOCATION_API_KEY) throw new Error("Missing GEOLOCATION_API_KEY")

    //CloudFlare passes an IP trail. We want the client IP
    ipAddress = ipAddress.split(",")[0]

    var geoRes = await fetch(`http://api.ipstack.com/${ipAddress}?access_key=${process.env.GEOLOCATION_API_KEY}`, {
        "method": "GET",
    })
    .then(response => response.json())

    if(!geoRes.continent_code) throw new Error("Geolocation failed")

    if(typeof options === "object" && options.stringify){
        return `${geoRes.city} ${geoRes.region_name}, ${geoRes.country_name}`
    }
    else return geoRes
}