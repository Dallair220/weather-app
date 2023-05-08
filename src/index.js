import display from './displayUI';
import fetchWeatherData from './processData';

const submit = document.querySelector('button');
const input = document.querySelector('#city');

submit.addEventListener('click', () => {
  const weatherData = fetchWeatherData(input.value);

  weatherData.then((data) => {
    console.log(data);
    display(data);
  });
});
