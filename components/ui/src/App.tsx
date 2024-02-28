import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import AppAppBar from "./components/AppAppBar"; // Assuming this is your custom AppAppBar component
import getLPTheme from "./getLPTheme"; // Assuming this is your theme creation function
import LandingPage from "./LandingPage";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/Auth";
import { Outlet } from "react-router-dom";
import './index.css'

export default function App() {
  // Load theme from local storage or default to "dark"
  const initialTheme = localStorage.getItem("theme") as PaletteMode || "dark";
  const [mode, setMode] = useState<PaletteMode>(initialTheme);

  // Persist theme to local storage on changes
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const LPtheme = createTheme(getLPTheme(mode)); // Create theme based on current mode

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={LPtheme}>
        <CssBaseline />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        {/* <LandingPage /> */} {/* Replace with your actual LandingPage component */}
        <Outlet />
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}
