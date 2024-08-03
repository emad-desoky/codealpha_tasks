// pages/_app.js
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Enables dark mode
    primary: {
      main: "#90caf9", // Light blue for primary
    },
    secondary: {
      main: "#f48fb1", // Pink for secondary
    },
    background: {
      default: "#121212", // Dark background color
      paper: "#1e1e1e", // Darker paper background
    },
    text: {
      primary: "#ffffff", // White text for primary
      secondary: "#b0b0b0", // Lighter gray text for secondary
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  // Add more customizations if needed
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
