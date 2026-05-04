import { createTheme, ThemeOptions } from '@mui/material/styles';

const googleThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#0b57d0', // Google Blue (M3)
      light: '#d3e3fd',
      dark: '#0842a0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c2e7ff', // Google Light Blue
      contrastText: '#001d35',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f1f1f',
      secondary: '#444746',
    },
    error: {
      main: '#b3261e',
    },
    success: {
      main: '#146c2e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Inter", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      borderRadius: 100, // Pill shaped buttons for M3
    },
  },
  shape: {
    borderRadius: 16, // M3 rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28, // Pill shape
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
          },
        },
        containedPrimary: {
          backgroundColor: '#0b57d0',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
        },
      },
    },
  },
};

export const googleTheme = createTheme(googleThemeOptions);
