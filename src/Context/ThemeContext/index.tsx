import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, ThemeOptions } from "@mui/material";
import { createContext, FC, useContext, useMemo, useState } from "react";
import { lightDefaultTheme, darkDefaultTheme } from "./constants";
import { ColorMode, ThemeContextState } from "./types";

const themeContextInitialState: ThemeContextState = {
  mode: "light",
  toggleColorMode: () => {
    return;
  },
};

const ThemeContext = createContext(themeContextInitialState);

const ThemeContextProvider: FC = ({ children }) => {
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [mode, setMode] = useState<ColorMode>(
    prefersDarkMode ? "dark" : "light"
  );

  const toggleColorMode = () => {
    setMode((prevMode: ColorMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme(
        (mode === "light"
          ? lightDefaultTheme
          : darkDefaultTheme) as unknown as ThemeOptions
      ),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const useThemeContext = (): ThemeContextState => {
  const themeContext = useContext(ThemeContext);

  return themeContext;
};

export { ThemeContext, ThemeContextProvider, useThemeContext };
