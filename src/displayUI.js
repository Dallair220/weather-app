// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';

function clearDisplay() {
  const dataContainer = document.querySelector('.data');
  dataContainer.innerHTML = '';
}

function createElement(htmlElement, text) {
  const dataContainer = document.querySelector('.data');
  const element = document.createElement(htmlElement);
  element.textContent = text;
  dataContainer.appendChild(element);
}

function addCityData(city, country, localtime) {
  createElement('h1', `${city}, ${country}`);
  createElement('h5', format(new Date(localtime), 'PPPP | HH:mm'));
}

function addCurrentData(condition, temperature, sunrise, sunset) {
  createElement('h3', `TODAY: ${temperature}°C, ${condition}`);
  createElement('h5', `Sunrise: ${sunrise}  | Sunset: ${sunset}`);
}

function addForeCastData(forecast) {
  forecast.forEach((day) => {
    const date = format(new Date(day.date), 'eeee, dd. MMMM');
    createElement('h3', `${day.maxTemp}°C - ${date}`);
    createElement('h5', `${day.chanceOfRain}% rain chance - ${day.condition}`);
  });
}

function displayError() {
  createElement('h2', 'No city found!');
}

export default function display(location, current, forecast) {
  clearDisplay();
  if (!location) {
    displayError();
    return;
  }

  addCityData(location.city, location.country, location.localtime);
  addCurrentData(current.condition, current.temperature, current.sunrise, current.sunset);
  addForeCastData(forecast);
}
