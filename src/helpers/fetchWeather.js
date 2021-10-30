export const fetchWeather = (endpoint) => {
    const url = `http://dataservice.accuweather.com/${endpoint}`;
    return fetch(url);
}