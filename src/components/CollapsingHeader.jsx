/**
 *  Controls behavior of header
**/

import React from 'react';

import { ParallaxBanner } from 'react-scroll-parallax';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const appbarHeight = 58;

/** @param {import('@material-ui/core').Theme} theme */
function styles(theme) {
  return {
    root: {
      width: '100%'
    },
    imageContainer: {
      width: '100%',
      height: '360px',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      minHeight: '720px',
      objectFit: 'cover',
      backgroundColor: 'rgb(219,230,248)'
    },
    fadingSolid: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '360px',
      backgroundColor: theme.palette.primary.main
    },
    header_unstick: {
      width: '100%',
      position: 'relative',
      left: 0,
      top: -360
    },
    header_stick: {
      width: '100%',
      position: 'fixed',
      left: 0,
      top: -(360 - appbarHeight),
      zIndex: Number.MAX_SAFE_INTEGER
    },
    shader: {
      background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)',
      width: '100%',
      height: '360px',
      position: 'absolute',
      top: -42,
      left: 0,
      [theme.breakpoints.up('sm')]: {
        top: 0
      }
    },
    headerContent: {
      width: '100%',
      position: 'absolute',
      top: 360 - (appbarHeight),
      display: 'flex'
    },
    title: {
      padding: theme.spacing(2),
      position: 'absolute',
      color: 'white'
    },
    shadow: {
      boxShadow: '0px 7px 5px  rgba(0,0,0,0.6)'
    }
  };
}

/**
 *  @typedef {object} Props : Anything you can put to this component
 *  
 *  @property {string} imageSrc URL of background image
 *  @property {string} [profileImgSrc] Ignore this to remove profile image
 *  @property {string} [title] Custom title on app bar, it's optional
 *  
 *  @extends {React.Component<Props>}
 */
class CollapsingHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    if(typeof(props.imageSrc) != 'string') {
      throw new ReferenceError('"imageSrc" property is required by CollapsingHeader component');
    }

    this.state = {
      'fraction': 0,
      'marginBottom': 130,
      'profileDiameter': 200,
      'profileY': -8,
      'titleX': 200,
      'titleY': 78,
      'titleColor': 'rgb(0,0,0)'
    }

    this.compute = this.compute.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  compute(fraction) {
    const isProfileImg = (typeof(this.props.profileImgSrc) == 'string');
    const isMobile = (window.document.body.clientWidth < 800);

    // Margin bottom
    let marginBottom = this.state.marginBottom;
    if(isProfileImg) {
      if(isMobile) {
        marginBottom = 50;
      } else {
        marginBottom = 50 + (80 * (1 - this.state.fraction));
      }
    }

    // For Profile Picture
    let profileDiameter = this.state.profileDiameter;
    let profileY = this.state.profileY;
    if(isProfileImg) {
      if(isMobile) {
        profileDiameter = 100;
        profileY = -8;
      } else {
        profileDiameter = 200 / (this.state.fraction + 1);
        profileY = (this.state.fraction * 24) - 16;
      }
    }

    // For Title Position
    let titleX = this.state.titleX;
    let titleY = this.state.titleY;
    if(isProfileImg) {
      if(isMobile) {
        titleX = 100;
        titleY = -8;
      } else {
        titleX = 100 * (2 - fraction);
        titleY = (86 * (1-fraction)) - 8;
      }
    }

    // For Title Color
    let titleColor = this.state.titleColor;
    if(isProfileImg) {
      if(isMobile) {
        titleColor = 'rgb(255,255,255)';
      } else {
        const pixelValue = 255 * fraction
        titleColor = `rgb(${pixelValue},${pixelValue},${pixelValue})`;
      }
    }

    this.setState({
      'fraction': fraction || this.state.fraction,
      'marginBottom': marginBottom,
      'profileDiameter': profileDiameter,
      'profileY': profileY,
      'titleX': titleX,
      'titleY': titleY,
      'titleColor': titleColor
    });
  }

  handleScroll() {
    const scrollPos = window.pageYOffset;
    const fraction = Math.min(scrollPos / (360-(appbarHeight)), 1);

    this.compute(fraction);
  }

  componentDidMount() {
    window.document.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.document.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  render() {
    const {classes, imageSrc} = this.props;
    const bannerLayers = [
      {
        image: imageSrc,
        amount: 0.5
      }
    ];
    let stickPoint = 1;
    if(window.document.body.clientWidth < 500) {
      stickPoint = 0.87;
    }
    return (
      <div
        className={classes.root}
        style={{ 'marginBottom' : this.state.marginBottom + 'px' }}
      >
        <ParallaxBanner
          className={classes.root}
          layers={bannerLayers}
        />
        {this.renderShader()}
        <div className={this.state.fraction < stickPoint ? classes.header_unstick : classes.header_stick}>
          <Paper
            className={classes.fadingSolid}
            style={{ 'opacity' : this.state.fraction }}
            elevation={8}
          />
          <Container>
            {this.renderContents()}
          </Container>
        </div>
      </div>
    );
  }

  renderShader() {
    const {classes} = this.props;
    const isProfileImg = (typeof(this.props.profileImgSrc) == 'string');
    const isMobile = (window.document.body.clientWidth < 800);
    
    if(!isProfileImg || isMobile) {
      return (<div className={classes.shader}/>);
    } else {
      return "";
    }
  }

  renderContents() {
    const {classes, profileImgSrc} = this.props;
    const title = this.props.title || window.document.title;
    if(typeof(profileImgSrc) == 'string') {
      return (
        <div className={classes.headerContent}>
          <Avatar
            className={classes.shadow}
            src={profileImgSrc}
            alt={'Profile image of' + window.document.title}
            style={{
              'width': this.state.profileDiameter + 'px',
              'height': this.state.profileDiameter + 'px',
              'marginTop': this.state.profileY + 'px'
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            className={classes.title}
            style={{
              'marginLeft': this.state.titleX + 'px',
              'marginTop': this.state.titleY + 'px',
              'color': this.state.titleColor
            }}
          >
            <b>{title}</b>
          </Typography>
        </div>
      );
    } else {
      return (
        <div className={classes.headerContent}>
          <Typography
            variant="h4"
            component="h1"
            className={classes.title}
          >
            <b>{title}</b>
          </Typography>
        </div>
      );
    }
  }
}

export default withStyles(styles)(CollapsingHeader);