const OPENWEATHER_API_KEY = window.OPENWEATHER_APPID || "REPLACE_WITH_YOUR_OPENWEATHERMAP_API_KEY";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lagos,NG&units=metric&appid=${OPENWEATHER_API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Lagos,NG&units=metric&appid=${OPENWEATHER_API_KEY}`;

const tempEl = document.getElementById("weather-temp");
const descEl = document.getElementById("weather-desc");
const iconEl = document.getElementById("weather-icon");
const forecastContainer = document.getElementById("forecast");

function formatTemp(temp) {
    return Math.round(temp) + "\u00B0C";
}

function pickMiddayReading(items) {
    return items.reduce((best, item) => {
        const hour = new Date(item.dt * 1000).getHours();
        const diff = Math.abs(hour - 12);
        return diff < best.diff ? { diff, item } : best;
    }, { diff: 12, item: items[0] }).item;
}

function renderForecast(forecast) {
    const days = new Map();
    forecast.list.forEach((item) => {
        const key = new Date(item.dt * 1000).toDateString();
        if (!days.has(key)) {
            days.set(key, []);
        }
        days.get(key).push(item);
    });

    forecastContainer.innerHTML = "";
    const dateKeys = [...days.keys()].slice(0, 3);

    dateKeys.forEach((key) => {
        const item = pickMiddayReading(days.get(key));
        const date = new Date(item.dt * 1000);
        const dayLabel = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        }).format(date);

        const card = document.createElement("div");
        card.classList.add("forecast-card");

        const day = document.createElement("p");
        day.classList.add("forecast-day");
        day.textContent = dayLabel;

        const temp = document.createElement("p");
        temp.classList.add("forecast-temp");
        temp.textContent = formatTemp(item.main.temp);

        const label = document.createElement("p");
        label.classList.add("forecast-label");
        label.textContent = "Forecast";

        card.append(day, temp, label);
        forecastContainer.appendChild(card);
    });
}

async function getWeather() {
    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error("Weather request failed");
        }
        const weather = await weatherResponse.json();

        tempEl.textContent = formatTemp(weather.main.temp);
        descEl.textContent = weather.weather[0].description;
        iconEl.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        iconEl.alt = weather.weather[0].description;

        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error("Forecast request failed");
        }
        const forecast = await forecastResponse.json();
        renderForecast(forecast);
    } catch (error) {
        descEl.textContent = "Weather data is currently unavailable.";
        forecastContainer.innerHTML =
            '<p class="weather-note">Please check back shortly.</p>';
        console.error(error);
    }
}

getWeather();