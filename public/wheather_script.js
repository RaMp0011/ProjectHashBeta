const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Mumbai';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c272416b7cmsh29524a126147bdcp13b4e9jsn820a058f584c',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

try {
  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(result => {
      let obj=JSON.parse(result)
      console.log(obj);
      let speed=obj.wind_speed*3.6;
      temperatureElement.innerHTML=`${obj.temp}°C`;
      hum.innerHTML=`${obj.humidity}%`;
      Cloud.innerHTML=`${obj.cloud_pct}%`;
      wind.innerHTML=`${speed.toFixed(2)}km/hr`;
        cityElement.innerHTML=city;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
} catch (error) {
  console.error('An error occurred:', error);
}
// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'c272416b7cmsh29524a126147bdcp13b4e9jsn820a058f584c';
const city = 'Mumbai'; // Replace with the desired city

// const weatherContainer = document.getElementById('weather');
const cityElement = document.getElementById('city');
const temperatureElement = document.getElementById('temp');
const hum = document.getElementById('humidity');
const Cloud = document.getElementById('cloud');
const wind = document.getElementById('wind');

// Fetch weather data from the API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Update the HTML elements with weather data
    cityElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp - 273.15)}°C`; // Convert temperature from Kelvin
    conditionsElement.textContent = data.weather[0].description;
    iconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });