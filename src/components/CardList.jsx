/**
 *  Swipeable horizontal cards list
**/

/**
 *  @typedef {object} ItemProps (Anything you can put to this component in Array)
 *  @property {string} subject
 *  @property {string} imageSrc
 *  @property {string} title
 *  @property {string} href
**/
/**
 *  @typedef {object} Props
 *  @property {ItemProps[]} items
 */

import React from 'react';

import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      width: 'fit-content',
      minWidth: '100%',
      height: 'max-content'
    },
    card: {
      width: '320px',
      height: '100%',
      marginRight: theme.spacing(4),
      backgroundColor: theme.palette.secondary.dark,
      color: 'white'
    },
    image: {
      width: '100%',
      height: '240px',
      objectFit: 'contain',
      objectPosition: 'center center',
      marginBottom: theme.spacing(2),
      zIndex: -1
    },
    title: {
      width: '100%',
      textAlign: 'center'
    }
  })
);

/** @param {ItemProps} itemProps */
function renderItem(classes, itemProps, key) {
  return (
    <Card
      className={classes.card}
      key={key}
      elevation={4}
    >
      <CardActionArea href={itemProps.href} target="_blank">
        <CardContent>
          <Typography variant="body2" component="p">
            {itemProps.subject}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.image}
          image={itemProps.imageSrc}
          title={itemProps.title}
        />
        <CardContent>
          <Typography
            className={classes.title}
            variant="h4"
            component="h3"
            gutterBottom
          >
            <b>{itemProps.title}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

/** @param {Props} props */
function CardList(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.items.map(
        (eachItemProps, index) => {
          return renderItem(classes, eachItemProps, index);
        }
      )}
    </div>
  );
}

export default CardList;