import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f0f11',
      paper: '#1a1a1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    primary: {
      main: '#f40087', // розовый акцент
    },
  },
  typography: {
    fontFamily: `'Montserrat', 'Arial', sans-serif`,
    h1: {
      fontSize: '3rem',
      fontWeight: 900,
      textTransform: 'uppercase',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
