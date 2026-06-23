const API_KEY = '3dab5bd8924fa4167f0cfd32cfca5dba'; // Replace with your OpenWeatherMap key

const weatherIcons = {
  Clear: '☀️', Clouds: '☁️', Rain: '🌧️',
  Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️',
  Mist: '🌫️', Fog: '🌫️', Haze: '🌫️'
};

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  const resultDiv = document.getElementById('weatherResult');
  const errorDiv = document.getElementById('errorMsg');
  resultDiv.style.display = 'none';
  errorDiv.style.display = 'none';

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('City not found');

    const data = await response.json();
    const main = data.weather[0].main;

    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} m/s`;
    document.getElementById('weatherIcon').textContent = weatherIcons[main] || '🌡️';

    resultDiv.style.display = 'block';

  } catch (err) {
    errorDiv.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cityInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') getWeather();
  });
});