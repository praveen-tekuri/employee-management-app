import { useState } from 'react'
import useFetch from '../../hooks/useFetch';

interface WeatherResponse{
  name: string;
  main: {temp: number; feels_like: number; humidity: number};
  weather: {description: string, icon: string}[]
}

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const Weather = () => {
  const [city, setCity] = useState("");
  const {data: weatherData, loading, error, fetchData} = useFetch<WeatherResponse>();
  
  const handleFetch = () => {
    if(!city.trim()) return;
    fetchData(`${weatherApiUrl}?q=${city}&appid=${weatherApiKey}&units=metric`);
  }

  return (
    <div className='border p-5 rounded w-[50%] mx-auto'>
      <h1>Weather Report</h1>
        <div className="search-weather">
            <input value={city} onChange={(e) => setCity(e.target.value)} aria-label='City name' className='border p-2 block rounded w-full' type="text" />
            <button onClick={handleFetch} aria-label='Check weather' className='border rounded p-2 cursor-pointer flex mt-5'>Check Weather</button>
        </div>
        {loading && <h3 className='text-center mt-3'>Loading...</h3>}
        {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
        { weatherData && ( 
            <div className="weather-details mt-5 text-center flex flex-col">
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className='w-[90px] mx-auto' alt="weather icon"/>
              <h3 className='font-semibold'>{weatherData.name} </h3>
              <p className='font-semibold mt-3'>Temp: {weatherData.main.temp} °C - Feels like: {weatherData.main.feels_like}</p>
              <p className='font-semibold mt-3'>Condition: {weatherData.weather[0].description}</p>
            </div>
        )}
    </div>
  )
}

export default Weather