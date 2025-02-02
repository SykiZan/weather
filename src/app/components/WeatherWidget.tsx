"use client";
import { Box, Typography, CircularProgress, Grid2 } from "@mui/material";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiHumidity,
  WiStrongWind,
} from "weather-icons-react";
import React, { useContext } from "react";
import { WiSnow } from "react-icons/wi";
import { WeatherContext } from "./WeatherProvider";

interface ForecastData {
  dt: number;
  weather: { main: string }[];
  main: {
    temp: number;
  };
}


type ForecastDataWithPlaceholder =
  | ForecastData
  | { dt: number; weather: { main: string }[]; main: { temp: string } };

export const WeatherWidget = ({ size = "medium" }) => {
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext) {
    return (
      <Typography color="error">Weather context is not available.</Typography>
    );
  }

  const { weather, forecast, loading, error } = weatherContext;

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const customWeekdaysOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getDayOfWeek = (dt: number) => {
    return new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
  };

  const sortedForecast: ForecastDataWithPlaceholder[] = customWeekdaysOrder.map(
    (dayOfWeek) => {
      const matchingDay = forecast?.find(
        (day: ForecastData) => getDayOfWeek(day.dt) === dayOfWeek
      );

      return (
        matchingDay || {
          dt: 0,
          weather: [{ main: "None" }],
          main: { temp: "--" },
        }
      );
    }
  );

  return (
    <Box
      p={3}
      bgcolor="#1E293B"
      color="white"
      borderRadius={2}
      textAlign="center"
      width={size === "small" ? 150 : size === "medium" ? 300 : 800}
    >
      <Typography variant="h6">{weather?.name}</Typography>
      <Typography variant="h5">{weather?.main?.temp}°C</Typography>
      <Box display="flex" justifyContent="center" mt={1}>
        {weather?.weather[0]?.main === "Clear" && (
          <WiDaySunny size={50} color="#FFD700" />
        )}
        {weather?.weather[0]?.main === "Clouds" && (
          <WiCloudy size={50} color="#B0C4DE" />
        )}
        {weather?.weather[0]?.main === "Rain" && (
          <WiRain size={50} color="#4682B4" />
        )}
        {weather?.weather[0]?.main === "Snow" && (
          <WiSnow size={50} color="#ADD8E6" />
        )}
      </Box>
      {size !== "small" && (
        <>
          <Typography variant="body2">
            Feels like {weather?.main?.feels_like}°C
          </Typography>
          <Typography variant="body2">
            Humidity: {weather?.main?.humidity}% <WiHumidity size={20} />
          </Typography>
          <Typography variant="body2">
            Wind: {weather?.wind?.speed} m/s <WiStrongWind size={20} />
          </Typography>
        </>
      )}

      {size === "large" && (
        <Box overflow="auto" width="100%">
          <Grid2
            container
            spacing={2}
            mt={3}
            justifyContent="center"
            direction="row"
            flexWrap="nowrap"
          >
            {sortedForecast.map(
              (day: ForecastDataWithPlaceholder, index: number) => (
                <Grid2 key={index} sx={{ flex: "0 0 auto" }} component="div">
                  <Box
                    p={2}
                    bgcolor="#334155"
                    borderRadius={2}
                    sx={{ minHeight: 150 }}
                  >
                    <Typography variant="body2">
                      {day.dt === 0
                        ? "No data"
                        : new Date(day.dt * 1000).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                    </Typography>
                    {day.weather[0].main === "Clear" && (
                      <WiDaySunny size={30} color="#FFD700" />
                    )}
                    {day.weather[0].main === "Clouds" && (
                      <WiCloudy size={30} color="#B0C4DE" />
                    )}
                    {day.weather[0].main === "Rain" && (
                      <WiRain size={30} color="#4682B4" />
                    )}
                    {day.weather[0].main === "Snow" && (
                      <WiSnow size={30} color="#ADD8E6" />
                    )}

                    {(!(
                      day.weather[0]?.main === "Clear" ||
                      day.weather[0]?.main === "Clouds" ||
                      day.weather[0]?.main === "Rain" ||
                      day.weather[0]?.main === "Snow"
                    ) ||
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      day.weather[0].main === "None") && (
                      <Box width={30} height={30} bgcolor="transparent" />
                    )}

                    <Typography variant="body2">
                      {day.main.temp === "--" ? "N/A" : `${day.main.temp}°C`}
                    </Typography>
                  </Box>
                </Grid2>
              )
            )}
          </Grid2>
        </Box>
      )}
    </Box>
  );
};

// export const WeatherWidget = ({ size = "medium" }) => {
//   const weatherContext = useContext(WeatherContext);
//   if (!weatherContext) {
//     return (
//       <Typography color="error">Weather context is not available.</Typography>
//     );
//   }

//   const { weather, forecast, loading, error } = weatherContext;

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   // Define the full custom weekday order
//   const customWeekdaysOrder = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const getDayOfWeek = (dt: number) => {
//     return new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
//   };

//   // Sort and map forecast to ensure all days are displayed, even if there is no data
//   const sortedForecast = customWeekdaysOrder.map((dayOfWeek) => {
//     const matchingDay = forecast.find(
//       (day: ForecastData) => getDayOfWeek(day.dt) === dayOfWeek
//     );

//     return matchingDay
//       ? matchingDay
//       : { dt: 0, weather: [{ main: "None" }], main: { temp: "--" } };
//   });

//   return (
//     <Box
//       p={3}
//       bgcolor="#1E293B"
//       color="white"
//       borderRadius={2}
//       textAlign="center"
//       width={size === "small" ? 150 : size === "medium" ? 300 : 800}
//     >
//       <Typography variant="h6">{weather?.name}</Typography>
//       <Typography variant="h5">{weather?.main?.temp}°C</Typography>
//       <Box display="flex" justifyContent="center" mt={1}>
//         {weather?.weather[0]?.main === "Clear" && (
//           <WiDaySunny size={50} color="#FFD700" />
//         )}
//         {weather?.weather[0]?.main === "Clouds" && (
//           <WiCloudy size={50} color="#B0C4DE" />
//         )}
//         {weather?.weather[0]?.main === "Rain" && (
//           <WiRain size={50} color="#4682B4" />
//         )}
//         {weather?.weather[0]?.main === "Snow" && (
//           <WiSnow size={50} color="#ADD8E6" />
//         )}
//       </Box>
//       {size !== "small" && (
//         <>
//           <Typography variant="body2">
//             Feels like {weather?.main?.feels_like}°C
//           </Typography>
//           <Typography variant="body2">
//             Humidity: {weather?.main?.humidity}% <WiHumidity size={20} />
//           </Typography>
//           <Typography variant="body2">
//             Wind: {weather?.wind?.speed} m/s <WiStrongWind size={20} />
//           </Typography>
//         </>
//       )}

//       {size === "large" && (
//         <Box overflow="auto" width="100%">
//           <Grid2
//             container
//             spacing={2}
//             mt={3}
//             justifyContent="center"
//             direction="row"
//             flexWrap="nowrap"
//           >
//             {sortedForecast.map((day: ForecastData, index: number) => (
//               <Grid2 key={index} sx={{ flex: "0 0 auto" }} component="div">
//                 <Box
//                   p={2}
//                   bgcolor="#334155"
//                   borderRadius={2}
//                   sx={{ minHeight: 150 }}
//                 >
//                   <Typography variant="body2">
//                     {day.dt === 0
//                       ? "No data"
//                       : new Date(day.dt * 1000).toLocaleDateString("en-US", {
//                           weekday: "long",
//                         })}
//                   </Typography>
//                   {day.weather[0].main === "Clear" && (
//                     <WiDaySunny size={30} color="#FFD700" />
//                   )}
//                   {day.weather[0].main === "Clouds" && (
//                     <WiCloudy size={30} color="#B0C4DE" />
//                   )}
//                   {day.weather[0].main === "Rain" && (
//                     <WiRain size={30} color="#4682B4" />
//                   )}
//                   {day.weather[0].main === "Snow" && (
//                     <WiSnow size={30} color="#ADD8E6" />
//                   )}
//                   {day.weather[0].main === "None" && (
//                     <Box width={30} height={30} bgcolor="transparent" />
//                   )}
//                   <Typography variant="body2">
//                     {day.main.temp === "--" ? "N/A" : `${day.main.temp}°C`}
//                   </Typography>
//                 </Box>
//               </Grid2>
//             ))}
//           </Grid2>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export const WeatherWidget = ({ size = "medium" }) => {
//   const weatherContext = useContext(WeatherContext);
//   if (!weatherContext) {
//     return (
//       <Typography color="error">Weather context is not available.</Typography>
//     );
//   }

//   const { weather, forecast, loading, error } = weatherContext;

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box
//       p={3}
//       bgcolor="#1E293B"
//       color="white"
//       borderRadius={2}
//       textAlign="center"
//       width={size === "small" ? 150 : size === "medium" ? 300 : 600}
//     >
//       <Typography variant="h6">{weather?.name}</Typography>
//       <Typography variant="h5">{weather?.main?.temp}°C</Typography>
//       <Box display="flex" justifyContent="center" mt={1}>
//         {weather?.weather[0]?.main === "Clear" && (
//           <WiDaySunny size={50} color="#FFD700" />
//         )}
//         {weather?.weather[0]?.main === "Clouds" && (
//           <WiCloudy size={50} color="#B0C4DE" />
//         )}
//         {weather?.weather[0]?.main === "Rain" && (
//           <WiRain size={50} color="#4682B4" />
//         )}
//         {weather?.weather[0]?.main === "Snow" && (
//           <WiSnow size={50} color="#ADD8E6" />
//         )}
//       </Box>
//       {size !== "small" && (
//         <>
//           <Typography variant="body2">
//             Feels like {weather?.main?.feels_like}°C
//           </Typography>
//           <Typography variant="body2">
//             Humidity: {weather?.main?.humidity}% <WiHumidity size={20} />
//           </Typography>
//           <Typography variant="body2">
//             Wind: {weather?.wind?.speed} m/s <WiStrongWind size={20} />
//           </Typography>
//         </>
//       )}

//       {size === "large" && (
//         <Box overflow="auto" width="100%">
//           <Grid2
//             container
//             spacing={2}
//             mt={3}
//             justifyContent="center"
//             direction="row"
//             flexWrap="nowrap"
//           >
//             {forecast?.map((day: ForecastData, index: number) => (
//               <Grid2 key={index} sx={{ flex: "0 0 auto" }} component="div">
//                 <Box
//                   p={2}
//                   bgcolor="#334155"
//                   borderRadius={2}
//                   sx={{ minHeight: 150 }}
//                 >
//                   <Typography variant="body2">
//                     {new Date(day.dt * 1000).toLocaleDateString("en-US", {
//                       weekday: "long",
//                     })}
//                   </Typography>
//                   {day.weather[0].main === "Clear" && (
//                     <WiDaySunny size={30} color="#FFD700" />
//                   )}
//                   {day.weather[0].main === "Clouds" && (
//                     <WiCloudy size={30} color="#B0C4DE" />
//                   )}
//                   {day.weather[0].main === "Rain" && (
//                     <WiRain size={30} color="#4682B4" />
//                   )}
//                   {day.weather[0].main === "Snow" && (
//                     <WiSnow size={30} color="#ADD8E6" />
//                   )}
//                   {!(
//                     day.weather[0]?.main === "Clear" ||
//                     day.weather[0]?.main === "Clouds" ||
//                     day.weather[0]?.main === "Rain" ||
//                     day.weather[0]?.main === "Snow"
//                   ) && <Box width={30} height={30} bgcolor="transparent" />}
//                   <Typography variant="body2">{day.main.temp}°C</Typography>
//                 </Box>
//               </Grid2>
//             ))}
//           </Grid2>
//         </Box>
//       )}
//     </Box>
//   );
// };
