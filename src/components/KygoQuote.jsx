import React from 'react';

import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import quoteIcon from '../resources/quote.svg';
import computerIcon from '../resources/computer_icon.svg';

const useStyles = makeStyles(
  theme => ({
    root: {
      width: '100%',
      padding: theme.spacing(2),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      overflowX: 'clip'
    },
    quote: {
      width: '3em',
      height: '3em'
    },
    reference: {
      margin: '16px'
    },
    sideIcon: {
      maxWidth: '258px',
      height: '100%'
    }
  })
);

function calculateSpacing() {
  const width = window.document.body.clientWidth;
  if(width < 900) return 2;
  else if(width < 1100) return 3;
  else return 4;
}

function calculateContentWidth() {
  const width = window.document.body.clientWidth;
  if(width < 900) return "";
  else return "64%";
}

function calculateQuoteSize() {
  const width = window.document.body.clientWidth;
  if(width < 900) return "1em";
  else if(width < 1100) return "2em";
  else return "3em";
}

function calculateVariant() {
  const width = window.document.body.clientWidth;
  if(width < 900) return "h4";
  else if(width < 1100) return "h3";
  else return "h2";
}

function renderSideIcon(classes) {
  const width = window.document.body.clientWidth;
  if(width < 900) {
    return "";
  } else {
    return (
      <Grid item>
        <img
          className={classes.sideIcon}
          src={computerIcon}
          alt="an illustration that describe a workdesk with computer."
        />
      </Grid>
    );
  }
}

function KygoQuote() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container spacing={calculateSpacing()}>
        <Grid item>
          <img
            className={classes.quote}
            src={quoteIcon}
            alt="a quote says:"
            style={{
              'width': calculateQuoteSize(),
              'height': calculateQuoteSize()
            }}
          />
        </Grid>
        <Grid item style={{ 'width' : calculateContentWidth() }}>
          <Typography variant={calculateVariant()} component="h2">
            <i>
              What is beyond us?<br/>
              Where is beyond us?<br/>
              Let's see and decide...
            </i>
          </Typography>
          <Typography className={classes.reference} component="p">
            — Kyrre Gørvell-Dahll et al., 2017
          </Typography>
        </Grid>
        {renderSideIcon(classes)}
      </Grid>
    </Container>
  );
}

export default KygoQuote;