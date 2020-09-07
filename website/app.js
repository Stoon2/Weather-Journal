/* Global Variables */
const api_key = 'PUT YOUR API KEY HERE';
const api_address = 'https://community-open-weather-map.p.rapidapi.com/weather?zip=';
const server_url = '127.0.0.1:3000/';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listeners
document.getElementById('generate').addEventListener('click', ()=>{
    generate();
});

// Event functions
async function generate(){
    let zip_code = document.getElementById('zip').value; // Gets value in the zip code text area.
    const feelings = document.getElementById('feelings').value; // Get feelings value from DOM
    getWeather(zip_code) // Calls API on zip code provided to get weather
    .then((info)=>{
        const temp = info.main.temp; // Assign weather the temprature 
        const data = {date: d, temp: temp, content: feelings}; // Create an object to hold our data for simplicity 
        addData("/post_entry", data); // Send all of our data to the server
    })
    .then(()=>{
        update_UI(); // Chaining last promise according to dev strategy in Udacity to update UI
    })
};

/* Function to get weather data using zip code, it includes headers for API key and usage of metric units */
async function getWeather(zip){
    const weather = await fetch(api_address + zip + "&units=metric", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": api_key
        }
    })
    try{
        const response = await weather.json(); // converting to JSON
        return response;  
    }
    catch(error){
        console.log("error", error);
    }
};

/* Function to add data to our server via a POST request pointed to our server's POST route */
async function addData(url = '', data={}){
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const post = await response.json();
        console.log(post);
        return post;
    } catch (error) {
        console.log("error", error);
    }
};

/*Makes a GET request to get up to date information from our server and updates our HTML accordingly */
async function update_UI(){
    const response = await fetch('/get_project');
    try {
        const data = await response.json();
        document.getElementById('date').innerHTML = `Date: ${data[0].date}`;
        document.getElementById('temp').innerHTML = `Temprature in Celsius: ${data[0].temp}`;
        document.getElementById('content').innerHTML = `I felt: ${data[0].content}`;   
    } catch (error) {
        console.log("error", error);
    }  
}
