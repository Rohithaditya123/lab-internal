
const apiKey = "YOUR_API_KEY";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const message = document.getElementById("message");

    if (city === "") {
        message.textContent = "Please enter a city name!";
        return;
    }

    if (apiKey === "YOUR_API_KEY") {
        message.textContent = "Please add your OpenWeather API key.";
        return;
    }

    message.textContent = "Loading weather...";

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent =
            data.name + ", " + data.sys.country;

        document.getElementById("temperature").textContent =
            Math.round(data.main.temp) + " °C";

        document.getElementById("condition").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            data.main.humidity + "%";

        document.getElementById("wind").textContent =
            data.wind.speed + " m/s";

        const weather = data.weather[0].main;

        const icons = {
            Clear: "",
            Clouds: "",
            Rain: "",
            Drizzle: "",
            Thunderstorm: "",
            Snow: "",
            Mist: "",
            Fog: "",
            Haze: ""
        };

        document.getElementById("icon").textContent =
            icons[weather] || "";

        message.textContent = "Weather updated successfully!";

    } catch (error) {
        message.textContent =
            "City not found or network error. Try again.";
    }
}
