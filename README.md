# Weather-App
Displays the weather information for the specified location. Created to be a fun and quick project.

Built with Bootstrap, Yahoo weather API, Google Places API, Node.js, Express.js, and EJS. 

## Setup
1. Install the node modules
```npm install```  

2. Create .env in the project's root directory
Populate the .env with the following. 
Get your Yahoo API credentials at https://developer.yahoo.com/weather/
Get your Google Cloud API key at https://console.cloud.google.com/apis/library. Enable the "Maps JavaScript API".
Get your Geolocation API key at https://ipstack.com/
```
NODE_ENV=development
PORT=8080
YAHOO_WEATHER_APP_ID=
YAHOO_WEATHER_CONSUMER_KEY=
YAHOO_WEATHER_CONSUMER_SECRET=
GOOGLE_CLOUD_API_KEY=
GEOLOCATION_API_KEY=
```

### To-do
* Change it so the error messages display on the page instead