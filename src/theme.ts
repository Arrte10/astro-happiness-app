import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Theme configuration to set the default color mode and disable system mode
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Define a custom brand color palette inspired by soothing blues
const colors = {
  brand: {
    50: "#f5faff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
};

// Extend the default Chakra UI theme
const theme = extendTheme({ config, colors });

export default theme;
