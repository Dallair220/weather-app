import display from './displayUI';
import fetchWeatherData from './processData';

const submit = document.querySelector('button');
const input = document.querySelector('#city');

export default function kickOffWeatherDisplay(city) {
  const weatherData = fetchWeatherData(city);

  weatherData.then((data) => {
    if (!data) {
      display(false);
      return;
    }
    display(data.location, data.current, data.forecast);
  });
}

submit.addEventListener('click', () => {
  kickOffWeatherDisplay(input.value);
});
