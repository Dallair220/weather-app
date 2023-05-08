// eslint-disable-next-line import/no-extraneous-dependencies
import { format, parseISO } from 'date-fns';

const dataContainer = document.querySelector('.data');

function clearDisplay() {
  dataContainer.innerHTML = '';
}

function addCityData(city, country, localtime) {
  const title = document.createElement('h1');
  title.textContent = `${city}, ${country}`;
  dataContainer.appendChild(title);

  const time = document.createElement('h5');
  time.textContent = format(parseISO(localtime), 'PPPP | HH:mm');
  dataContainer.appendChild(time);
}

function addCurrentData(condition, temperature, sunrise, sunset) {
  const tempCond = document.createElement('h3');
  tempCond.textContent = `TODAY: ${temperature}°C, ${condition}`;
  dataContainer.appendChild(tempCond);

  const sun = document.createElement('h5');
  sun.textContent = `Sunrise: ${sunrise}  | Sunset: ${sunset}`;
  dataContainer.appendChild(sun);
}

function addForeCastData(forecast) {
  forecast.forEach((day) => {
    const foreCastDay = document.createElement('h3');
    foreCastDay.textContent = `${day.date} = ${day.maxTemp}°C`;
    dataContainer.appendChild(foreCastDay);

    const condition = document.createElement('h5');
    condition.textContent = `${day.chanceOfRain}% rain chance - ${day.condition}`;
    dataContainer.appendChild(condition);
  });
}

function displayError() {
  const err = document.createElement('h2');
  err.textContent = 'No city found!';
  dataContainer.appendChild(err);
}

export default function display(location, current, forecast) {
  clearDisplay();
  if (!location) {
    displayError();
    return;
  }

  addCityData(location.city, location.country, location.localtime);
  addCurrentData(
    current.condition,
    current.temperature,
    current.sunrise,
    current.sunset
  );
  addForeCastData(forecast);
}
