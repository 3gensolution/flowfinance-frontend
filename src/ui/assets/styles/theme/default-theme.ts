"use client";

import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#101922",
      paper: "#1a2430",
    },
    primary: {
      main: "#2b8cee",
      light: "#5fa3f5",
      dark: "#1f62c4",
    },
    secondary: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cbd5e1",
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 900,
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  } as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "0.5rem",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #2b8cee 0%, #1f62c4 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #5fa3f5 0%, #2b8cee 100%)",
            boxShadow: "0 8px 24px rgba(43, 140, 238, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
} as any);
