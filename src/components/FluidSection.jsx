/**
 *  Shows nice fluid content section with each section's title
**/

/**
 *  @typedef {object} Props (Anything you can put to this component)
 *  @property {number} [title]
 *  @property {string} [iconSrc]
 *  @property {string} [iconAlt]
 *  @property {string} [backgroundSrc]
 *  @property {import('react').ReactNode} [children]
**/

import React from 'react';

import { ParallaxBanner } from 'react-scroll-parallax';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(
  theme => ({
    root: {
      width: '100%'
    },
    header: {
      width: '100%',
      backgroundColor: theme.palette.primary.dark,
      color: '#fff'
    },
    title: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2)
    },
    icon: {
      width: '48px',
      height: '48px',
      marginRight: theme.spacing(4)
    },
    background: {
      width: '100%',
      minHeight: '480px'
    },
    horizontalScroll: {
      width: '100%',
      overflowX: 'auto'
    },
    wrapper: {
      width: '100%',
      position: 'relative'
    },
    content: {
      padding: theme.spacing(2)
    },
    overlayedContent: {
      width: '100%',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      position: 'absolute',
      top: 0,
      overflowX: 'auto',
      [theme.breakpoints.up('lg')]: {
        overflowX: 'hidden'
      }
    },
    
  })
);

function renderIcon(classes, props) {
  if(typeof(props.iconSrc) == 'string') {
    return (
      <img
        className={classes.icon}
        src={props.iconSrc}
        alt={props.iconAlt || ""}
      />
    );
  } else {
    return "";
  }
}

/** @param {Props} props */
function renderContent(classes, props) {
  if(typeof(props.backgroundSrc) == 'string') {
    const bannerLayers = [
      {
        image: props.backgroundSrc,
        amount: 0.3
      }
    ];
    return (
      <div className={classes.wrapper}>
        <ParallaxBanner
          className={classes.background}
          layers={bannerLayers}
        />
        <div className={classes.overlayedContent}>
          {props.children || ""}
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.horizontalScroll}>
        <Container className={classes.content}>
          {props.children || ""}
        </Container>
      </div>
    );
  }
}

/** @param {Props} props */
function FluidSection(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.header}>
        <Container className={classes.title}>
          {renderIcon(classes, props)}
          <Typography variant="h4" component="h2">
            {props.title || " "}
          </Typography>
        </Container>
      </Paper>
      {renderContent(classes, props)}
    </div>
  );
}

export default FluidSection;