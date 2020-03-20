//Frontend responsible for calling the API's
var fetchWeather = "/weather";

const weatherform = document.querySelector('form');
const search = document.querySelector('input')

const weatherIcon = document.querySelector('.weatherIcon i')
const weatherCondition = document.querySelector('.weatherCondition')

const tempElement = document.querySelector('.temperature span')

const locationElement = document.querySelector('.place')

const dateElement = document.querySelector('.date')

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherform.addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log(search.value)
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";

    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            // console.log(data)
            if (data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            }else{
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature -273.5).toFixed(1) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    });
})