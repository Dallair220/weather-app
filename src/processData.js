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
  for (let i = 1; i <= 7; i += 1) {
    forecast.push({
      date: data.forecast.forecastday[i].date,
      minTemp: data.forecast.forecastday[i].day.mintemp_c,
      maxTemp: data.forecast.forecastday[i].day.maxtemp_c,
      condition: data.forecast.forecastday[i].day.condition.text,
      chanceOfRain: data.forecast.forecastday[i].day.daily_chance_of_rain,
    });
  }

  return { location, current, forecast };
}

export default async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=cd6f48f4184542a8aa0160641230505&q=${city}&days=8&aqi=no&alerts=no`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return processWeatherData(data);
  } catch (error) {
    if (error.message === '400') {
      console.log('No such city available!');
    } else {
      console.error(error);
    }
    return false;
  }
}
