import './style.scss'
import 'bootstrap';
import gsap from 'gsap';

//START SEARCH BUTTON
const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('.search-btn')

const weatherInfoSection = document.querySelector('.weather-info1')
const weatherInfoSection2 = document.querySelector('.weather-info2')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')

const nameTxt = document.querySelector('.name-text')
const countryTxt = document.querySelector('.country')
const tempTxt = document.querySelector('.temp-text')
const conditionTxt = document.querySelector('.condition-text')
const humidityTxt = document.querySelector('.humidity-value')
const windSpeedTxt = document.querySelector('.wind-speed-value')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currentDate = document.querySelector('.current-date')

const forecastItems = document.querySelector('.forecast-list')

const apiKey = import.meta.env.VITE_API_KEY;
const apiURL = import.meta.env.VITE_API_URL;

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `${apiURL}/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`
    try {
        const response = await fetch(apiUrl)
        return response.json()
    } catch {
        return null
    }
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
    const date = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return date.toLocaleDateString('en-GB', options)
}

async function updateWeatherInfo(city) {
    // Fetch both endpoints in parallel instead of sequentially
    const [weatherData, forecastsData] = await Promise.all([
        getFetchData('weather', city),
        getFetchData('forecast', city)
    ])

    if (!weatherData || weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return
    }

    const {
        name,
        sys: { country },
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData

    nameTxt.textContent = name
    countryTxt.textContent = ', ' + country
    tempTxt.textContent = Math.round(temp) + ' °C'
    conditionTxt.textContent = main
    humidityTxt.textContent = humidity + '%'
    windSpeedTxt.textContent = speed + ' M/s'
    currentDate.textContent = getCurrentDate()

    const allText = document.querySelectorAll(
        '.name-text, .country, .humidity-value, .wind-speed-value, .temp-text, .condition-text'
    )
    gsap.fromTo(allText, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })

    weatherSummaryImg.onload = () => {
        gsap.fromTo(
            weatherSummaryImg,
            { scale: 0, opacity: 0 },
            {
                scale: 1.1,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(weatherSummaryImg, { scale: 1, duration: 0.6, ease: 'power2.out' })
                }
            }
        )
    }
    weatherSummaryImg.src = `/${getWeatherIcon(id)}`

    if (forecastsData) {
        updateForecastsInfo(forecastsData)
    }

    showDisplaySection(weatherInfoSection, weatherInfoSection2)
}

// Accepts already-fetched data instead of re-fetching
function updateForecastsInfo(forecastsData) {
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    forecastItems.innerHTML = ''
    forecastsData.list.forEach(forecastWeather => {
        if (
            forecastWeather.dt_txt.includes(timeTaken) &&
            !forecastWeather.dt_txt.includes(todayDate)
        ) {
            updateForecastItems(forecastWeather)
        }
    })
}

function updateForecastItems(weatherData) {
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData

    const dateResult = new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short'
    })

    const forecastItem = `
    <div class="forecast-card">
        <p class="forecast-date">${dateResult}</p>
        <img src="/${getWeatherIcon(id)}" alt="weather icon" width="55" loading="lazy">
        <p class="forecast-temp">${Math.round(temp)} °C</p>
    </div>`

    forecastItems.insertAdjacentHTML('beforeend', forecastItem)
}

function showForecastPopupAnimation() {
    const forecastImages = document.querySelectorAll('.forecast-list img')
    const total = forecastImages.length
    if (total === 0) return

    let loadedCount = 0

    const onImageLoad = () => {
        loadedCount++
        if (loadedCount === total) {
            gsap.fromTo(
                forecastImages,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.15 }
            )
        }
    }

    forecastImages.forEach(img => {
        if (img.complete) {
            onImageLoad()
        } else {
            img.onload = onImageLoad
            img.onerror = onImageLoad  // count errors so animation isn't stuck
        }
    })
}

function showDisplaySection(...sectionsToDisplay) {
    [weatherInfoSection, weatherInfoSection2, searchCitySection, notFoundSection].forEach(section => {
        section.style.setProperty('display', 'none', 'important')
    })

    const searchCol = document.querySelector('.search-col')
    if (searchCol) {
        searchCol.style.setProperty('display', 'none', 'important')
    }

    sectionsToDisplay.forEach(section => {
        section.style.setProperty('display', 'block', 'important')
        if (section === weatherInfoSection2 && searchCol) {
            searchCol.style.setProperty('display', 'block', 'important')
        }
    })

    if (sectionsToDisplay.includes(weatherInfoSection2)) {
        showForecastPopupAnimation()
    }
}
//END SEARCH BUTTON
