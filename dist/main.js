(()=>{"use strict";const t=document.querySelector("button"),e=document.querySelector("#city");t.addEventListener("click",(()=>{(async function(t){try{const e=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cd6f48f4184542a8aa0160641230505&q=${t}&days=8&aqi=no&alerts=no`);if(!e.ok)throw new Error(e.status);return function(t){const e={country:t.location.country,city:t.location.name,localtime:t.location.localtime},o={condition:t.current.condition.text,temperature:t.current.temp_c,sunrise:t.forecast.forecastday[0].astro.sunrise,sunset:t.forecast.forecastday[0].astro.sunset},a=[];for(let e=1;e<=7;e+=1)a.push({date:t.forecast.forecastday[e].date,minTemp:t.forecast.forecastday[e].day.mintemp_c,maxTemp:t.forecast.forecastday[e].day.maxtemp_c,condition:t.forecast.forecastday[e].day.condition.text,chanceOfRain:t.forecast.forecastday[e].day.daily_chance_of_rain});return{location:e,current:o,forecast:a}}(await e.json())}catch(t){return"400"===t.message?console.log("No such city available!"):console.error(t),!1}})(e.value).then((t=>{console.log(t),function(t){const e=document.querySelector(".container"),o=document.createElement("h1");o.textContent="something",e.appendChild(o)}()}))}))})();