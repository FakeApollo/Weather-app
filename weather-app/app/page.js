'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '85bd4cffb5836792f1a5832c07668053';

  useEffect(() => {
    setMounted(true);
  }, []);

  

  const handleCheck = async () => {
    if (!city) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (response.ok) {
        setWeather(data);
        setError('');
      } else {
        setError(`City "${city}" not found. Please check the spelling and try again.`);
        setWeather(null);
      }
    } catch (error) {
      setError('Error fetching weather data. Please check your internet connection.');
      setWeather(null);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Weather App</h1>
        
        <div className={styles.card}>
          <div className={styles.inputSection}>
            <input 
              type="text" 
              placeholder="Enter city name..." 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.input}
            />
            <button 
              onClick={handleCheck} 
              disabled={loading}
              className={styles.button}
            >
              {loading ? 'Loading...' : 'Check'}
            </button>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          {weather && (
            <div className={styles.weatherInfo}>
              <div className={styles.cityName}>
                {weather.name}, {weather.sys.country}
              </div>
              
              <div className={styles.mainTemp}>
                  {Math.round(weather.main.temp)}°C
                </div>

              <div className={styles.weatherGrid}>
                <div className={styles.weatherRow}>
                  <strong>Temperature</strong> 
                  <span>{`${Math.round(weather.main.temp)}°C`}</span>
                </div>
                <div className={styles.weatherRow}>
                  <strong>Humidity</strong> 
                  <span>{`${weather.main.humidity}%`}</span>
                </div>
                <div className={styles.weatherRow}>
                  <strong>Weather</strong> 
                  <span style={{textTransform: 'capitalize'}}>{weather.weather[0].description}</span>
                </div>
                <div className={styles.weatherRow}>
                  <strong>Wind Speed</strong> 
                  <span>{`${weather.wind.speed} m/s`}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}