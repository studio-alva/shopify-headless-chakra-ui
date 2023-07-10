// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 3. extend the theme
const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    body: "Inter",
    heading: "Inter",
  },
  colors: {
    neutral: {
      100: "#EFEFEF",
    },
    brand: {
      100: "#E7E7FF",
      500: "#6B4EFF",
      600: "#573BE5",
      700: "#4C32CD",
      800: "#4C32CD",
      900: "#4C32CD",
    },
    sky: {
      100: "#F2F6FA",
      200: "#EDF2F7",
      300: "#E9EEF5",
      900: "#0D0E0F",
    },
    ink: {
      500: "#0D0E0F",
      600: "#0D0E0F",
      900: "#0D0E0F",
    },
    red: {
      100: "#FFE3E3",
      500: "#FF5247",
      900: "#0D0E0F",
    },
    blue: {
      100: "#C9F0FF",
      500: "#00A1FF",
      900: "#0D0E0F",
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "sky.100",
      },
      //styles for the `a`
      // a: {
      //   color: "teal.500",
      //   _hover: {
      //     textDecoration: "none",
      //   },
      // },
    },
  },
  breakpoint: {
    sm: "480px",
    md: "768px",
    lg: "1109px",
    xl: "1400px",
    "2xl": "1600px",
  },
});

export default theme;
