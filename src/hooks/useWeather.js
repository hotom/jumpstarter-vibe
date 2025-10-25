import { useState, useEffect } from 'react';

// Hong Kong coordinates
const HK_LATITUDE = 22.3193;
const HK_LONGITUDE = 114.1694;

const getWeatherEmoji = (weatherCode) => {
  // WMO Weather interpretation codes
  // https://open-meteo.com/en/docs
  
  if (weatherCode === 0) return '☀️'; // Clear sky
  if (weatherCode === 1 || weatherCode === 2) return '🌤️'; // Mainly clear, partly cloudy
  if (weatherCode === 3) return '☁️'; // Overcast
  if (weatherCode >= 45 && weatherCode <= 48) return '🌫️'; // Fog
  if (weatherCode >= 51 && weatherCode <= 57) return '🌧️'; // Drizzle
  if (weatherCode >= 61 && weatherCode <= 67) return '🌧️'; // Rain
  if (weatherCode >= 71 && weatherCode <= 77) return '🌨️'; // Snow
  if (weatherCode >= 80 && weatherCode <= 82) return '🌦️'; // Rain showers
  if (weatherCode >= 85 && weatherCode <= 86) return '🌨️'; // Snow showers
  if (weatherCode >= 95 && weatherCode <= 99) return '⛈️'; // Thunderstorm
  
  return '🌤️'; // Default
};

export function useWeather() {
  const [weather, setWeather] = useState({
    emoji: '🌤️',
    description: '',
    temperature: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${HK_LATITUDE}&longitude=${HK_LONGITUDE}&current=temperature_2m,weather_code&timezone=Asia/Hong_Kong`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather');
        }

        const data = await response.json();
        const weatherCode = data.current.weather_code;
        const temperature = Math.round(data.current.temperature_2m);
        
        setWeather({
          emoji: getWeatherEmoji(weatherCode),
          description: getWeatherDescription(weatherCode),
          temperature,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Weather fetch error:', error);
        setWeather({
          emoji: '🌤️',
          description: '',
          temperature: null,
          loading: false,
          error: error.message
        });
      }
    };

    fetchWeather();
    
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return weather;
}

function getWeatherDescription(weatherCode) {
  if (weatherCode === 0) return 'Clear Sky';
  if (weatherCode === 1 || weatherCode === 2) return 'Partly Cloudy';
  if (weatherCode === 3) return 'Overcast';
  if (weatherCode >= 45 && weatherCode <= 48) return 'Foggy';
  if (weatherCode >= 51 && weatherCode <= 57) return 'Drizzle';
  if (weatherCode >= 61 && weatherCode <= 67) return 'Rainy';
  if (weatherCode >= 71 && weatherCode <= 77) return 'Snow';
  if (weatherCode >= 80 && weatherCode <= 82) return 'Rain Showers';
  if (weatherCode >= 85 && weatherCode <= 86) return 'Snow Showers';
  if (weatherCode >= 95 && weatherCode <= 99) return 'Thunderstorm';
  return 'Partly Cloudy';
}

