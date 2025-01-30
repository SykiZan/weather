



"use client";

import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: { main: string }[];
  wind: { speed: number };
}

interface ForecastData {
  dt: number;
  weather: { main: string }[];
  main: {
    temp: number;
  };
}

interface WeatherContextType {
  weather: WeatherData | null;
  forecast: ForecastData[] | null;
  loading: boolean;
  error: string | null;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("New York");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const API_KEY = "e31da34c164ec6814d65785d97406592";
        const lat = 40.7128;
        const lon = -74.006;

        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        setWeather(weatherResponse.data);
        setForecast(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          forecastResponse.data.list.filter((_, index) => index % 8 === 0)
        );
      } catch {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <WeatherContext.Provider
      value={{ weather, forecast, loading, error, setLocation }}
    >
      {children}
    </WeatherContext.Provider>
  );
};



// "use client";

// import axios from "axios";

// import React, { useState, useEffect, createContext } from "react";

// interface WeatherData {
//   name: string;
//   main: {
//     temp: number;
//     feels_like: number;
//     humidity: number;
//   };
//   weather: { main: string }[];
//   wind: { speed: number };
// }

// interface ForecastData {
//   dt: number;
//   weather: { main: string }[];
//   main: {
//     temp: number;
//   };
// }

// interface WeatherContextType {
//   weather: WeatherData | null;
//   forecast: ForecastData[] | null;
//   loading: boolean;
//   error: string | null;
//   setLocation: React.Dispatch<React.SetStateAction<string>>;
// }

// export const WeatherContext = createContext<WeatherContextType | null>(null);

// export const WeatherProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [forecast, setForecast] = useState<ForecastData[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [location, setLocation] = useState<string>("New York");

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         setLoading(true);
//         const API_KEY = "e31da34c164ec6814d65785d97406592";
//         const lat = 40.7128;
//         const lon = -74.006;

//         const weatherResponse = await axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
//         );
//         const forecastResponse = await axios.get(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
//         );

//         setWeather(weatherResponse.data);
//         setForecast(
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           // @ts-expect-error
//           forecastResponse.data.list.filter((_, index) => index % 8 === 0)
//         );
//       } catch {
//         setError("Failed to fetch weather data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, [location]);

//   return (
//     <WeatherContext.Provider
//       value={{ weather, forecast, loading, error, setLocation }}
//     >
//       {children}
//     </WeatherContext.Provider>
//   );
// };