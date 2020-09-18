var OAuth = require('oauth');

/**
 * Returns the weather forcast for the specified location
 * @param {*} location The location you want to receive weather data for. E.g a city name
 */
function RequestForcast(location){
    return new Promise((resolve, reject) => {
        new OAuth.OAuth(
            null,
            null,
            process.env.YAHOO_WEATHER_CONSUMER_KEY,
            process.env.YAHOO_WEATHER_CONSUMER_SECRET,
            '1.0',
            null,
            'HMAC-SHA1',
            null,
            {
                "X-Yahoo-App-Id": process.env.YAHOO_WEATHER_APP_ID
            }
        )
        .get(
            `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${location}&format=json`,
            null,
            null,
            function (err, data, result) {
                if (err) reject(err)
                else resolve(JSON.parse(data))
            }
        );
    })
}

module.exports = RequestForcast