const getWeatherData = async () => {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=-6.256858467253276&lon=106.61845422990275&appid=e95c21ea779de444df63daed2f0e6edd');
  return response.json();
};

const getDogsData = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random/4');
  return response.json();
};

export { getWeatherData, getDogsData };
