'use client'
import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '85bd4cffb5836792f1a5832c07668053';

  const handleCheck = async () => {
    if (!city) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (response.ok) {
        setWeather(data);
      } else {
        alert('City not found!');
      }
    } catch (error) {
      alert('Error fetching weather data');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Weather App</h1>
      <div style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="City" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '10px', marginRight: '10px', width: '200px' }}
        />
        <button onClick={handleCheck} disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Loading...' : 'Check'}
        </button>
      </div>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Weather Information</h2>
        <p><strong>Temperature:</strong> {weather ? `${weather.main.temp}°C` : '--°C'}</p>
        <p><strong>Humidity:</strong> {weather ? `${weather.main.humidity}%` : '--%'}</p>
        <p><strong>Weather:</strong> {weather ? weather.weather[0].description : '--'}</p>
        <p><strong>Wind Speed:</strong> {weather ? `${weather.wind.speed} m/s` : '-- m/s'}</p>
        <p><strong>Pressure:</strong> {weather ? `${weather.main.pressure} hPa` : '-- hPa'}</p>
      </div>
    </div>
  );
}