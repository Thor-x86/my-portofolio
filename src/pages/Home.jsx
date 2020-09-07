/**
 * This is an actual homepage, The "pages" directory
 * supposed to store every pages for this site.
**/

import React from 'react';

import { getUserLocales } from 'get-user-locale';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Parallax } from 'react-scroll-parallax';
import CollapsingHeader from '../components/CollapsingHeader';
import KygoQuote from '../components/KygoQuote';
import FluidSection from '../components/FluidSection';
import CardList from '../components/CardList';
import KeepLearning from '../components/KeepLearning';

import headerImage from '../resources/header.jpg';
import profileImage from '../resources/profile.jpg';
import geekIcon from '../resources/geek.svg';
import keyIcon from '../resources/key.svg';
import itsPicture from '../resources/its_campus.jpg';
import sleepyIcon from '../resources/sleepy_passenger.svg';
import fiwlIcon from '../resources/fiwl.svg'
import sandPicture from '../resources/sand.jpg';

/**
 *  This object is for styling. Basically,
 *  we use CSS in form of JS object.
 *  
 *  @param {import('@material-ui/core').Theme} theme
 */
function styles(theme) {
  return {
    root: {
      width: '100%',
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    footer: {
      width: '100%',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      textAlign: 'center',
      marginTop: theme.spacing(2)
    },
    sourceButton: {
      marginBottom: theme.spacing(2),
      color: theme.palette.secondary.contrastText
    },
    normalizeLink: {
      '& a': {
        color: theme.palette.secondary.light,
        textDecoration: 'none'
      }
    },
    copyright: {
      width: '100%',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
      color: 'white',
      backgroundColor: theme.palette.primary.dark
    }
  }
}

// I'm called diferrently on my own country
let nickname = 'Eric';
if(getUserLocales().includes('id')) {
  nickname = 'Ariq';
}

// List of achievements:
const myAchievements = [
  {
    subject: 'Student of',
    imageSrc: itsPicture,
    title: 'Engineering Physics at ITS',
    href: 'https://www.its.ac.id/id/beranda/'
  },
  {
    subject: 'Creator of',
    imageSrc: sleepyIcon,
    title: 'Sleepy Passenger',
    href: 'https://play.google.com/store/apps/details?id=com.atinyepicstudio.sleepypassenger'
  },
  {
    subject: 'Maintainer of',
    imageSrc: fiwlIcon,
    title: 'FIWL',
    href: 'https://thor-x86.github.io/fiwl-docs/'
  }
];

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      'myName': `Athaariq "${nickname}" Ardhiansyah`
    };

    this.handleScreenResize = this.handleScreenResize.bind(this);
  }

  handleScreenResize() {
    // When resizing to smaller window, make name shorter
    let myName = this.state.myName;
    if(window.document.body.clientWidth < 550) {
      myName = 'Athaariq A.';
    } else if(window.document.body.clientWidth < 750) {
      myName = 'Athaariq Ardhiansyah';
    } else {
      myName = `Athaariq "${nickname}" Ardhiansyah`;
    }

    this.setState({ 'myName' : myName });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleScreenResize);
    this.handleScreenResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenResize);
  }

  render() {
    const { classes } = this.props;

    let xParallax = [8,24];
    if(window.document.body.clientWidth < 950) {
      xParallax = [8,-16];
    } else if(window.document.body.clientWidth < 1250) {
      xParallax = [2,2]
    }

    return (
      <div className={classes.root}>
        <CollapsingHeader imageSrc={headerImage} profileImgSrc={profileImage} title={this.state.myName}/>
        <KygoQuote/>
        <FluidSection
          title="Who am I?"
          iconSrc={geekIcon}
          iconAlt="Geek icon, yes.. I'm an avid computer geek"
          backgroundSrc={sandPicture}
        >
          <Parallax x={xParallax}>
            <CardList items={myAchievements} />
          </Parallax>
        </FluidSection>
        <FluidSection
          title="The Key Motivation"
          iconSrc={keyIcon}
          iconAlt="An icon represents key motivation"
        >
          <KeepLearning/>
        </FluidSection>
        <div className={classes.footer}>
          <Typography variant="h3" component="h2" gutterBottom>
            So you do :)
          </Typography>
          <Button
            className={classes.sourceButton}
            color="secondary"
            variant="contained"
            size="large"
            href="https://github.com/Thor-x86/my-portofolio#readme"
          >
            SEE THIS SOURCE CODE
          </Button>
          <Typography className={classes.normalizeLink}>
            Thanks to <a href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noopener noreferrer">Freepik</a> and <a href="https://www.flaticon.com/authors/becris" target="_blank" rel="noopener noreferrer">becris</a> for the icons
          </Typography>
        </div>
        <Typography className={classes.copyright}>
          © Copyright 2020 Athaariq Ardhiansyah. The source code is licensed under MIT.
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Home);