import React from 'react';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Slider from '@material-ui/core/Slider';

import ThreeScene from './ThreeScene';

/** @param {import('@material-ui/core').Theme} theme */
function styles(theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    title: {
      width: '100%',
      textAlign: 'center',
      position: 'absolute',
      left: 0,
      pointerEvents: 'none',
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(2)
      }
    },
    threeScene: {
      width: '100%',
      height: '360px'
    },
    card: {
      padding: theme.spacing(4),
      width: '75%',
      [theme.breakpoints.up('sm')]: {
        width: '50%'
      }
    },
    slider: {
      marginBottom: theme.spacing(4)
    }
  };
}

function generateFract() {
  return (Math.random()-0.5)/20;
}

class KeepLearning extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pitch: generateFract(),
      yaw: generateFract(),
      roll: generateFract()
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name) {
    return (_event, newValue) => {
      this.setState({ [name] : newValue });
    }
  }

  render() {
    const {classes} = this.props;
    const sliderMarks = [
      {
        value: -0.025,
        label: '-50%'
      },
      {
        value: 0,
        label: '0%'
      },
      {
        value: 0.025,
        label: '50%'
      }
    ];
    return (
      <div className={classes.root}>
        <Typography
          className={classes.title}
          variant="h3"
          component="p"
        >
          Keep Learning Further.
        </Typography>
        <ThreeScene
          className={classes.threeScene}
          pitch={this.state.pitch}
          yaw={this.state.yaw}
          roll={this.state.roll}
        />
        <Card className={classes.card} elevation={8}>
          <Typography id="slide-pitch">
            Pitch
          </Typography>
          <Slider
            className={classes.slider}
            value={this.state.pitch}
            min={-0.05}
            max={0.05}
            step={0.001}
            marks={sliderMarks}
            onChange={this.handleChange('pitch')}
            aria-labelledby="slider-pitch"
            color="secondary"
          />
          <Typography id="slide-yaw">
            Yaw
          </Typography>
          <Slider
            className={classes.slider}
            value={this.state.yaw}
            min={-0.05}
            max={0.05}
            step={0.001}
            marks={sliderMarks}
            onChange={this.handleChange('yaw')}
            aria-labelledby="slider-yaw"
            color="secondary"
          />
          <Typography id="slide-roll">
            Roll
          </Typography>
          <Slider
            className={classes.slider}
            value={this.state.roll}
            min={-0.05}
            max={0.05}
            step={0.001}
            marks={sliderMarks}
            onChange={this.handleChange('roll')}
            aria-labelledby="slider-roll"
            color="secondary"
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(KeepLearning);