import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#212121',
      card: '#212121',
    },
    text: {
      primary: '#fff',
      secondary: '#663399',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    // mode: 'light',
    primary: {
      main: '#B3A9DA',
    },
    secondary: {
      main: '#32127A',
    },
    background: {
      default: '#32127A',
      paper: '#f5f5f5',
      card: '#f5f5f5',
    },
    text: {
      primary: '#212121',
      secondary: '#663399',
    },
  },
});

export { darkTheme, lightTheme };