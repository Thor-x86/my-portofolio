// Framework modules:
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Third-party modules:
import { ParallaxProvider } from 'react-scroll-parallax';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';

// App's modules:
import './index.sass';
import Home from './pages/Home';

const theme = createMuiTheme({
  palette : {
    primary: {
      main: '#795548',
      light: '#a98274',
      dark: '#4b2c20',
      contrastText: '#fff'
    },
    secondary: {
      main: '#43a047',
      light: '#76d275',
      dark: '#00701a',
      contrastText: '#fff'
    },
  }
});

// NOTE: Before create a new page, make sure react-router is implemented!
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ParallaxProvider>
        <Home />
      </ParallaxProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Workaround to fix parallax bug
// eslint-disable-next-line
if(window.pageYOffset > 0) window.location.href = window.location.href;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
