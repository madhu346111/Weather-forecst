const apiKey = "1b1909191c02dbd3f039fa4578dada2c";
const modeToggle = document.getElementById("modeToggle");
const searchBtn = document.getElementById("searchBtn");

window.onload = () => { detectLocation(); };

function detectLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos => {
      fetchWeatherByCoords(pos.coords.latitude,pos.coords.longitude);
    });
  }
}

async function fetchWeatherByCoords(lat, lon){
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
  const data = await res.json(); updateUI(data);
}

searchBtn.addEventListener("click", getWeather);
async function getWeather(){
  const city = document.getElementById("cityInput").value;
  if(!city) return alert("Enter city name");
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
  const data = await res.json();
  if(data.cod!="200"){ alert("City not found!"); return; }
  updateUI(data);
}

function updateUI(data){
  const current = data.list[0];
  document.getElementById("currentWeather").classList.remove("hidden");
  document.getElementById("cityName").innerText = data.city.name;
  document.getElementById("temperature").innerText = Math.round(current.main.temp)+"°C";
  document.getElementById("description").innerHTML = `${current.weather[0].description}<br>💧 Humidity: ${current.main.humidity}%<br>💨 Wind: ${current.wind.speed} m/s`;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;
  changeBackground(current.weather[0].main);
  createChart(data);
  displayForecast(data);
}

function changeBackground(weather){
  const body=document.body; 
  const anim=document.getElementById("weatherAnimation"); 
  anim.innerHTML="";
  if(weather.includes("Clear")){
    body.style.background="linear-gradient(-45deg,#fbc531,#f39c12,#ff6b6b,#ff9ff3)";
    body.style.backgroundSize="400% 400%"; body.style.animation="gradientMove 10s ease infinite";
    anim.innerHTML=`<div class="sun"></div>`;
  } else if(weather.includes("Cloud")){
    body.style.background="linear-gradient(-45deg,#bdc3c7,#2c3e50,#636e72,#95a5a6)";
    body.style.backgroundSize="400% 400%"; body.style.animation="gradientMove 15s ease infinite";
    anim.innerHTML=`<div class="cloud" style="top:120px;"></div><div class="cloud" style="top:200px; animation-duration:35s;"></div>`;
  } else if(weather.includes("Rain")){
    body.style.background="linear-gradient(-45deg,#2c3e50,#000428,#004e92,#000000)";
    body.style.backgroundSize="400% 400%"; body.style.animation="gradientMove 20s ease infinite";
    thunderEffect();
  } else {
    body.style.background="linear-gradient(-45deg,#141e30,#243b55,#000000,#2c3e50)";
    body.style.backgroundSize="400% 400%"; body.style.animation="gradientMove 20s ease infinite";
  }
}

function thunderEffect(){
  const flash = document.getElementById("flash");
  setInterval(()=>{ flash.style.opacity="0.8"; setTimeout(()=>flash.style.opacity="0",150); },5000);
}

function createChart(data){
  const ctx=document.getElementById("hourlyChart").getContext("2d");
  if(window.weatherChart) window.weatherChart.destroy();
  const labels=data.list.slice(0,8).map(item=>new Date(item.dt*1000).getHours()+":00");
  const temps=data.list.slice(0,8).map(item=>item.main.temp);
  window.weatherChart=new Chart(ctx,{
    type:"line",
    data:{ labels, datasets:[{ label:"Hourly Temp °C", data:temps, borderColor:"cyan", backgroundColor:"rgba(0,255,255,0.2)", tension:0.4, fill:true }] }
  });
}

function displayForecast(data){
  const forecastDiv=document.getElementById("forecast"); forecastDiv.innerHTML="";
  const dailyData=data.list.filter(item=>item.dt_txt.includes("12:00:00"));
  dailyData.slice(0,5).forEach(day=>{
    const date=new Date(day.dt_txt).toLocaleDateString("en-IN",{weekday:'short'});
    forecastDiv.innerHTML+=`
      <div class="bg-white/20 p-4 rounded-2xl text-center shadow-lg hover:scale-105 transition">
        <h3>${date}</h3>
        <img class="mx-auto w-14" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
        <p class="text-xl font-bold">${Math.round(day.main.temp)}°C</p>
      </div>`;
  });
}

// Dark/Light Toggle
modeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("dark-mode");
  const sun=document.querySelector("#weatherAnimation .sun");
  if(document.body.classList.contains("dark-mode")){
    modeToggle.innerText="☀️";
    modeToggle.classList.remove("bg-yellow-400","text-black");
    modeToggle.classList.add("bg-gray-800","text-white","hover:bg-gray-700");
    document.body.style.background="linear-gradient(135deg,#0f2027,#203a43,#2c5364)";
    document.body.style.backgroundSize="400% 400%"; document.body.style.animation="gradientMove 20s ease infinite";
    if(sun) sun.style.display="none"; createStars();
  } else {
    modeToggle.innerText="🌙";
    modeToggle.classList.remove("bg-gray-800","text-white","hover:bg-gray-700");
    modeToggle.classList.add("bg-yellow-400","text-black","hover:bg-yellow-500");
    document.body.style.background="linear-gradient(to right,#4facfe,#00f2fe)";
    document.body.style.backgroundSize="400% 400%"; document.body.style.animation="gradientMove 10s ease infinite";
    if(sun) sun.style.display="block"; document.querySelectorAll(".star").forEach(s=>s.remove());
  }
});

function createStars(){
  const anim=document.getElementById("weatherAnimation");
  document.querySelectorAll(".star").forEach(s=>s.remove());
  for(let i=0;i<50;i++){
    const star=document.createElement("div");
    star.className="star"; const size=Math.random()*2+1;
    star.style.width=size+"px"; star.style.height=size+"px";
    star.style.top=Math.random()*100+"%"; star.style.left=Math.random()*100+"%";
    star.style.animationDuration=1+Math.random()*2+"s";
    anim.appendChild(star);
  }
}