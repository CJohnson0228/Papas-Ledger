import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1B4264',
      contrastText: '#EEEEEE',
    },
    secondary: {
      main: '#7FB06D',
      contrastText: '#333333',
    },
    ledger: {
      bankmain: '#D3E4CD',
      banksecond: '#AECDA2',
    },
    yellow: {
      main: '#E7BF73',
      dark: '#DEA73F',
      light: '#F0D7A8'
    },
    dark: {
      main: '#333333',
      light: '#777777',
      dark: '#111111',
      contrastText: '#EEEEEE',
    }
  },
  typography: {
    fontFamily: 'Lato',
    h7: {
      fontFamily: 'Shadows Into Light',
      fontSize: '2rem',
    },
  },
});

export default theme;