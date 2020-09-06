// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express =  require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// POST route
app.post('/post_entry', (req, res) => {
    console.log("DATA PUSHED IS: ");
    console.log(req.body);
    projectData.push(req.body);
});

app.get('/get_project', async (req, res) => {
    res.send(projectData);
    projectData = []; // Empty the projectData object to only keep the most recent entry on page UI
});

// Setup Server
const hostname = '127.0.0.1';
const port = 3000;


server = app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`); // Displays server address and port in Terminal
    console.log(`App listening on port: ${port}!`);
});