import displayLoadingAnimation from './loading';

function processWeatherData(data) {
  const location = {
    country: data.location.country,
    city: data.location.name,
    localtime: data.location.localtime,
  };
  const current = {
    condition: data.current.condition.text,
    temperature: data.current.temp_c,
    sunrise: data.forecast.forecastday[0].astro.sunrise,
    sunset: data.forecast.forecastday[0].astro.sunset,
  };

  const forecast = [];
  data.forecast.forecastday.forEach((day) => {
    forecast.push({
      date: day.date,
      minTemp: day.day.mintemp_c,
      maxTemp: day.day.maxtemp_c,
      condition: day.day.condition.text,
      chanceOfRain: day.day.daily_chance_of_rain,
    });
  });

  return { location, current, forecast };
}

export default async function fetchWeatherData(city) {
  try {
    displayLoadingAnimation(true);
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=cd6f48f4184542a8aa0160641230505&q=${city}&days=8&aqi=no&alerts=no`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }

    // await new Promise((resolve) => {
    //   // Simulating a delayed network call to the server
    //   setTimeout(() => {
    //     resolve();
    //   }, 1000);
    // });

    const data = await response.json();
    displayLoadingAnimation(false);
    return processWeatherData(data);
  } catch (error) {
    displayLoadingAnimation(false);
    if (error.message === '400') {
      console.log('No such city available!');
    } else {
      console.error(error);
    }
    return false;
  }
}
