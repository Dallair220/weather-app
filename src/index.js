import display from './displayUI';
import fetchWeatherData from './processData';

const submit = document.querySelector('button');
const input = document.querySelector('#city');
const DEFAULT_CITY = 'Cologne';

function kickOffWeatherDisplay(city) {
  const weatherData = fetchWeatherData(city);

  weatherData.then((data) => {
    display(data.location, data.current, data.forecast);
  });
}

submit.addEventListener('click', () => {
  kickOffWeatherDisplay(input.value);
});

kickOffWeatherDisplay(DEFAULT_CITY);
