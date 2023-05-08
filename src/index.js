function processWeatherData(data) {
  const processedData = {
    country: data.location.country,
    city: data.location.name,
    localtime: data.location.localtime,
    condition: data.current.condition.text,
    temperature: data.current.temp_c,
  };
  console.log(data);
  return processedData;
}

async function weatherData(city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=cd6f48f4184542a8aa0160641230505&q=${city}`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return processWeatherData(data);
  } catch (error) {
    return console.log('No such city available!');
  }
}

const readyWeatherJSON = weatherData('Dubai');

readyWeatherJSON.then((x) => {
  console.log(x);
});
