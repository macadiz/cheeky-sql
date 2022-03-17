import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React, { FC } from "react";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme();

const CustomThemeProvider: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default CustomThemeProvider;
