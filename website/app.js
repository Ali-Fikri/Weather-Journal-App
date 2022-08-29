
/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '0568fa04e894c1f80dcb96734b9206a7';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', async _=> {

    /* Function to GET Web API Data*/
    try {
        let zipCode = document.getElementById('zip').value;
        let feelings = document.getElementById('feelings').value;
        
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
        const response = await fetch(url).then(res => res.json());
        const temp = await response.main.temp
        console.log(temp);

        /* Function to POST data */
        await fetch('/addWeather', {
            method: 'POST',
            credentials: 'same-origin',
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                newDate,
                temp,
                feelings
            })
        });
        /* Function to GET Project Data */
        const projectData = await fetch('/getWeather')
        .then(res => res.json());
        document.getElementById('date').innerHTML = projectData.date;
        document.getElementById('temp').innerHTML = projectData.temp;
        document.getElementById('content').innerHTML = projectData.feelings;
    } catch (err) {
        console.error(err);
    }
});
