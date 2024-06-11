// code of section 1//


document.addEventListener("DOMContentLoaded", function () {
  let cityNameElement = document.getElementById("key");

  // Add blur event listener to the input element
  cityNameElement.addEventListener("blur", function () {
    let cityName = cityNameElement.value;

    if (cityName) {
      var myRequest = new XMLHttpRequest();
      
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&limit=1&type=like&appid=89bef0e602098baf1a8adce517d51c92`;
      myRequest.open("GET", apiUrl, true);
      myRequest.send();

      myRequest.addEventListener("load", function () {
        if (myRequest.readyState === 4) {
          if (myRequest.status === 200) {
            try {
              let response = JSON.parse(myRequest.response);
              console.log(response); // Log the full response
              displayHome(response);
              if (response.length === 0) {
                console.warn("The response is an empty array. The city name might be invalid.");
              }
            } catch (e) {
              console.error("Error parsing response:", e);
            }
          } else {
            console.error("An error occurred during the request. Status:", myRequest.status);
          }
        }
      });
    } else {
      console.error("City name is empty.");
    }
  });
});

function displayHome(response) {
  let cityName = response.name;
  let cloudsDescription = response.weather[0].description;
  let temperature = response.main.temp;
  let celsius = (temperature - 273.15).toFixed(1);
  let cartona = `
    <div class="row mt-5">
        <div class="col-md-6 mt-3">
            <h2 class="mt-5 fs-1 text-white fw-bolder">${cityName}</h2>
            <p class="">${cloudsDescription}</p>
            <span>${celsius} °C</span>
        </div>
       <div class="col-md-6 mt-3 d-flex justify-content-center align-items-center">
    <img src="${getWeatherImage(cloudsDescription)}" class="ms-5 w-100 mb-5 pb-5" style="max-height: 80vh;">
</div>

    </div>
  `;
  getWeatherImage()
let wind = response.wind.speed
let feel = response.main.feels_like
let pressure = response.main.pressure
let humidity = response.main.humidity
let feels_like = (feel - 273.15).toFixed(1)
let windkm = (wind*3.6).toFixed(1)
let cartonatwo = `
    <div class="container text-center">
      <h6 class="text-center text-danger">Air conditions</h6>
      <div class="row">
        <div class="col-md-6">
          <h3 class="text-secondary"><i class="fa fa-thermometer-half"></i> Real Feel</h3>
          <span class="fs-3 ps-4">${feels_like} °C</span>
          <h3 class="text-secondary mt-3"><i class="fa fa-tachometer-alt"></i> Pressure</h3>
          <span class="fs-3 ps-4">${pressure} hPa</span>
        </div>
        <div class="col-md-6 mt-4">
          <h3 class="text-secondary"><i class="fa fa-water"></i> Humidity</h3>
          <span class="fs-3 ps-4">${humidity}%</span>
          <h3 class="text-secondary mt-3"><i class="fa fa-wind"></i> Wind</h3>
          <span class="fs-3 ps-4">${windkm} km/h</span>
        </div>
      </div>
    </div>
`;




let sunriseTimestamp = response.sys.sunrise;
let sunsetTimestamp = response.sys.sunset;

let sunriseDate = new Date(sunriseTimestamp * 1000);
let sunsetDate = new Date(sunsetTimestamp * 1000);

let sunriseHours = sunriseDate.getHours();
let sunriseMinutes = sunriseDate.getMinutes();

let sunsetHours = sunsetDate.getHours();
let sunsetMinutes = sunsetDate.getMinutes();

sunriseMinutes = sunriseMinutes < 10 ? '0' + sunriseMinutes : sunriseMinutes;

sunsetMinutes = sunsetMinutes < 10 ? '0' + sunsetMinutes : sunsetMinutes;


let formattedSunriseTime = sunriseHours + ':' + sunriseMinutes;
let formattedSunsetTime = sunsetHours + ':' + sunsetMinutes;
''
console.log("Sunrise:", formattedSunriseTime);
console.log("Sunset:", formattedSunsetTime);

let cartonathree = `
 <div class="text-center">
        <h3> Dont miss the sunset !</h3>
        <h4>Sunset will be at <span class="text-danger">${formattedSunriseTime}</span> </h4>
        <h4>Sunrise will be at<span class="text-danger">${formattedSunsetTime}</span> </h4>
    </div>
`
document.getElementById("section4").innerHTML = cartonathree





document.getElementById("section3").innerHTML = cartonatwo;
  document.getElementById('data').innerHTML = cartona;
}
function getWeatherImage(weatherDescription) {
  let imageUrl;

  switch (weatherDescription) {
    case "clear sky":
      imageUrl = "https://openweathermap.org/img/wn/01d@4x.png";
      break;
    case "few clouds":
      imageUrl = "https://openweathermap.org/img/wn/02d@4x.png";
      break;
    case "scattered clouds":
      imageUrl = "https://openweathermap.org/img/wn/03d@4x.png";
      break;
    case "broken clouds":
      imageUrl = "https://openweathermap.org/img/wn/04d@4x.png";
      break;
    case "shower rain":
      imageUrl = "https://openweathermap.org/img/wn/09d@4x.png";
      break;
    // Add more cases for other weather conditions
    default:
      // Use a default image if the weather condition is not recognized
      imageUrl = "https://openweathermap.org/img/wn/01d@4x.png";
      break;
  }

  return imageUrl;
}
// Code Of section 2
// api.openweathermap.org/data/2.5/forecast?q=${cityName},us&mode=xml&appid=89bef0e602098baf1a8adce517d51c92
document.addEventListener("DOMContentLoaded", function () {
  let cityNameElement = document.getElementById("key");
  cityNameElement.addEventListener("blur", function () {
      let cityName = cityNameElement.value;

      if (cityName) {
          let myRequest = new XMLHttpRequest();

          // Change the API URL to get XML data
          let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&mode=xml&appid=89bef0e602098baf1a8adce517d51c92`;
          myRequest.open("GET", apiUrl, true);
          myRequest.send();

          myRequest.addEventListener("load", function () {
              if (myRequest.readyState === 4) {
                  if (myRequest.status === 200) {
                      try {
                          let parser = new DOMParser();
                          let xmlDoc = parser.parseFromString(myRequest.responseText, "text/xml");
                          console.log(xmlDoc);
                          displayWeather(xmlDoc);
                      } catch (e) {
                          console.error("Error parsing XML response:", e);
                      }
                  } else {
                      console.error("An error occurred during the request. Status:", myRequest.status);
                  }
              }
          });
      } else {
          console.error("City name is empty.");
      }
  });
});

function displayWeather(xmlDoc) {
  let location = xmlDoc.querySelector("location name").textContent;
  let forecasts = Array.from(xmlDoc.querySelectorAll("forecast time"));

  let data = `
      <h3 class="text-white">3 Hour Forecast for ${location}</h3>
      <div class="row">
  `;
  let datatwo = `
        <h3 class="text-white"> 5 day Forecast for ${location}</h3>
      <div class="row">
  `
  for (let i = 0; i < 6; i++) {
      let forecast = forecasts[i];
      let from = new Date(forecast.getAttribute("from"));
      let temperature = parseFloat(forecast.querySelector("temperature").getAttribute("value"));
      let temperatureCelsius = (temperature - 273.15).toFixed(0);

      let hours = from.getHours();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      let time = hours + ':00 ' + ampm;

      data += `
          <div class="col-md-4 col-lg-2 text-center">
              <div class="content divider text-center">
                  <span class="text-secondary fs-4 fw-bolder">${time}</span>
                  <img src="${getWeatherImage(forecast.querySelector("clouds").getAttribute("value"))}" alt="">
                  <span class="fw-bolder fs-3 text-secondary">${temperatureCelsius}°C</span>
              </div>
          </div>
      `;
  }

  console.log(forecasts[0], forecasts[8],forecasts[17],forecasts[26],forecasts[35]);
  for (let i = 0; i < 36; i += 8) {
    let forecast = forecasts[i];
    let from = new Date(forecast.getAttribute("from"));
    let temperature = parseFloat(forecast.querySelector("temperature").getAttribute("value"));
    let temperatureCelsius = (temperature - 273.15).toFixed(0);
    let month = from.getMonth() + 1;
    let day = from.getDate();
  
    datatwo += `
  <div class="col-md-4 col-lg-2 text-center">
    <div class="content divider text-center">
      <span class="text-secondary fs-4 fw-bolder">${day}/${month}</span>
      <img src="${getWeatherImage(forecast.querySelector("clouds").getAttribute("value"))}" alt="">
      <span class="fw-bolder fs-3 text-secondary">${temperatureCelsius}°C</span>
    </div>
    `;
  
  }
  document.getElementById('section5').insertAdjacentHTML('beforeend', datatwo);

  

  document.getElementById('section2').innerHTML = data;
}

// https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid=89bef0e602098baf1a8adce517d51c92
