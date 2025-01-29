"use client";

import { Box } from "@mui/material";
import { WeatherProvider, WeatherWidget } from "./components/WeatherWidget";
import useScreenDimensions from "@/hooks/useScreenDimensions";

export default function App() {
  const screenDimentions = useScreenDimensions();

  return (
    <WeatherProvider>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={3}
        mt={5}
      >
        <div
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}
        >
          This widget is flexible
        </div>
        {screenDimentions.width >= 550 && <WeatherWidget size="large" />}
        {screenDimentions.width < 550 && screenDimentions.width >= 300 && (
          <WeatherWidget size="medium" />
        )}
        {screenDimentions.width < 300 && <WeatherWidget size="small" />}
        <div
          style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}
        >
          Example of all widgets
        </div>
        <WeatherWidget size="small" />
        <WeatherWidget size="medium" />
        <WeatherWidget size="large" />
      </Box>
    </WeatherProvider>
  );
}
