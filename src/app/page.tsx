"use client";

import { Box } from "@mui/material";

import useScreenDimensions from "@/hooks/useScreenDimensions";
import { WeatherProvider } from "./components/WeatherProvider";
import { WeatherWidget } from "./components/WeatherWidget";

export default function App() {
  const screenDimensions = useScreenDimensions();

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
        {screenDimensions.width >= 700 && <WeatherWidget size="large" />}
        {screenDimensions.width < 700 && screenDimensions.width >= 300 && (
          <WeatherWidget size="medium" />
        )}
        {screenDimensions.width < 300 && <WeatherWidget size="small" />}
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

// "use client";

// import { Box } from "@mui/material";
// import {  WeatherWidget } from "./components/WeatherWidget";
// import useScreenDimensions from "@/hooks/useScreenDimensions";
// import { WeatherProvider } from "./components/WeatherProvider";

// export default function App() {
//   const screenDimentions = useScreenDimensions();

//   return (
//     <WeatherProvider>
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         gap={3}
//         mt={5}
//       >
//         <div
//           style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}
//         >
//           This widget is flexible
//         </div>
//         {screenDimentions.width >= 700 && <WeatherWidget size="large" />}
//         {screenDimentions.width < 700 && screenDimentions.width >= 300 && (
//           <WeatherWidget size="medium" />
//         )}
//         {screenDimentions.width < 300 && <WeatherWidget size="small" />}
//         <div
//           style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}
//         >
//           Example of all widgets
//         </div>
//         <WeatherWidget size="small" />
//         <WeatherWidget size="medium" />
//         <WeatherWidget size="large" />
//       </Box>
//     </WeatherProvider>
//   );
// }
