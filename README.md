# Weather-forecst
# 🌤 Smart Weather App

## **Project Overview**
The **Smart Weather App** is a responsive web application that displays current weather, 5-day forecast, and hourly temperature charts. It includes dynamic **weather animations** (sun, clouds, stars) and supports **Dark/Light mode toggle** with smooth transitions.

---

## **Features**
1. **Search Weather by City**
   - Enter any city name to get current weather, temperature, humidity, and wind speed.
   
2. **Current Weather Display**
   - Weather icon
   - Temperature (°C)
   - Weather description
   - Humidity & Wind speed

3. **5-Day Forecast**
   - Shows forecast for the next 5 days at 12:00 PM
   - Includes weather icon and temperature

4. **Hourly Temperature Chart**
   - Line chart of next 8 hours
   - Uses Chart.js for visual representation

5. **Dynamic Background & Animations**
   - Sunny: Animated sun with glowing rays
   - Cloudy: Moving clouds animation
   - Rainy: Thunder flashes animation
   - Night/Dark mode: Stars appear in background

6. **Dark/Light Mode Toggle**
   - Toggle button at top-right corner
   - Changes theme, background gradients, and toggle icon
   - Smooth transition between light and dark mode

7. **Responsive Design**
   - Works on mobile, tablet, and desktop
   - Animations, inputs, and charts adjust to screen size

---

## **Technologies Used**
- **HTML5**: Structure
- **CSS3 & Tailwind CSS**: Styling, animations, responsive design
- **JavaScript (Vanilla)**: API integration, dynamic content, toggle functionality
- **Chart.js**: Hourly temperature line chart
- **OpenWeatherMap API**: Weather data source

---

## **File Structure**
smart-weather-app/
│
├── index.html # Main HTML file
├── style.css # All custom styles & animations
├── script.js # All JS functions & API handling
└── README.md # Project documentation



---

## **HTML Structure (index.html)**
- **Toggle Button**: `<button id="modeToggle">` – Switches between dark/light mode
- **Weather Card**: `<div>` container holding:
  - Search input & button
  - Current weather display
  - 5-day forecast grid
  - Hourly chart canvas
- **Weather Animation Container**: `<div id="weatherAnimation">` – For sun, clouds, stars

---

## **CSS Highlights (style.css)**
- `.sun` → Animated sun with pulsating glow and rotating rays
- `.cloud` → Moving cloud animation
- `.star` → Twinkling stars for night mode
- `.flash` → Lightning flash effect during rain
- Media queries for responsive sun and cloud sizing
- `.dark-mode` → Applied to `body` for night mode styling

---

## **JavaScript Functions (script.js)**
1. **API Calls**
   - `getWeather()` → Fetch weather by city
   - `fetchWeatherByCoords(lat, lon)` → Fetch weather by geolocation
2. **Update UI**
   - `updateUI(data)` → Updates current weather, forecast, and chart
3. **Animations**
   - `changeBackground(weather)` → Sets gradient & animation according to weather
   - `thunderEffect()` → Flash effect for rainy weather
   - `createStars()` → Adds twinkling stars for night/dark mode
4. **Chart**
   - `createChart(data)` → Draws hourly temperature line chart
5. **Dark/Light Mode Toggle**
   - Button toggles `.dark-mode` class and updates sun/star animations
   - Updates background gradient dynamically

---

## **Usage**
1. Open `index.html` in a browser.
2. Enter a city name and click **Search**.
3. View current weather, 5-day forecast, and hourly chart.
4. Click the **Moon/Sun toggle** to switch between dark and light mode.
5. The app is fully responsive and works on desktop and mobile devices.

---

## **API Key**
- OpenWeatherMap API is used for weather data.
- Insert your API key in `script.js`:
```javascript
const apiKey = "YOUR_API_KEY_HERE";
