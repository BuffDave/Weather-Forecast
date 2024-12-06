import './style.scss'
import 'bootstrap';

// // START BACKGROUND
document.addEventListener('DOMContentLoaded', () => {
  const interBubble = document.querySelector('.interactive');
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(() => {
          move();
      });
  }

  window.addEventListener('mousemove', (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
  });

  move();
});
// END BACKGROUND

//START SEARCH BUTTON
const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('.search-btn')

const weatherInfoSection = document.querySelector('.weather-info1')
const weatherInfoSection2 = document.querySelector('.weather-info2')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')

const countryTxt = document.querySelector('.country-text')
const tempTxt = document.querySelector('.temp-text')
const conditionTxt = document.querySelector('.condition-text')
const humidityTxt = document.querySelector('.humidity-value')
const windSpeedTxt = document.querySelector('.wind-speed-value')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currentDate = document.querySelector('.current-date')

const forecastItems = document.querySelector('.forecast-list')

const apiKey = 'ee7089e7c05d2b258d69593628d21292'

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        console.log(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})
cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' &&
        cityInput.value.trim() != '' 
    ) {
        updateWeatherInfo(cityInput.value)
        console.log(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiUrl)

    return response.json()
}

function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.png'
    if (id <= 321) return 'drizzle.png'
    if (id <= 531) return 'rain.png'
    if (id <= 622) return 'snow.png'
    if (id <= 781) return 'atmosphere.png'
    if (id <= 800) return 'clear.png'
    else return 'clouds.png'
}

function getCurrentDate() {
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-GB', options)
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city)
    
    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main}],
        wind: {speed}
    } = weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round (temp) + ' °C'
    conditionTxt.textContent = main
    humidityTxt.textContent = humidity + '%'
    windSpeedTxt.textContent = speed + ' M/s'

    currentDate.textContent = getCurrentDate()
    weatherSummaryImg.src = `/${getWeatherIcon(id)}`

    await updateForecastsInfo(city)
    showDisplaySection(weatherInfoSection, weatherInfoSection2)
}

async function updateForecastsInfo(city) {
    const forecastsData = await getFetchData('forecast', city)
    
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]
    
    forecastItems.innerHTML = ''
    forecastsData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken) &&
            !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastItems(forecastWeather)
        }
    })
}

function updateForecastItems(weatherData) {
    console.log(weatherData)
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData

    const dateTaken = new Date(date)
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }
    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)

    const forecastItem = `
    <div class="bg-light bg-opacity-10 rounded-4 d-flex flex-column align-items-center justify-content-center p-3">
        <p class="m-0 fw-lighter card-date-1">${dateResult}</p>
        <img src="/${getWeatherIcon(id)}" alt="storm with heavy rain icon" width="65" class="py-1">
        <p class="m-0 card-temp-1">${Math.round(temp)} °C</p>
    </div>
    `

    forecastItems.insertAdjacentHTML('beforeend', forecastItem)
}

function showDisplaySection(...sectionsToDisplay) {
    [weatherInfoSection, weatherInfoSection2, searchCitySection, notFoundSection]
    .forEach(section => section.style.setProperty('display', 'none', 'important'));

    sectionsToDisplay.forEach(section => {
        section.style.setProperty('display', 'block', 'important');
    });
}
//END SEARCH BUTTON