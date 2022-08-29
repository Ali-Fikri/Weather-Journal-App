// Setup empty JS object to act as endpoint for all routes
projectData = {};

const bodyParser = require('body-parser');
// Require Express to run server and routes
const express = require('express');
const cors = require("cors")
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = process.env.port || 8000;
const hostName = process.env.hostName || "localhost";
app.listen(port, hostName, _=> {
    console.log(`Server is running at http://${hostName}:${port}`);
});
app.post('/addWeather', (req, res) => {
    projectData.date = req.body.newDate;
    projectData.temp = req.body.temp;
    projectData.feelings = req.body.feelings;
    res.end()
});
app.get('/getWeather', (req, res) => {
    res.send(projectData);
})