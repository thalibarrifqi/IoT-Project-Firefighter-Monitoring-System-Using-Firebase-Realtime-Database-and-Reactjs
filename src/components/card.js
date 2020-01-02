import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Image from './resource/icon-orang-png.png';
import 'typeface-roboto';

const useStyles = makeStyles({
  card: {
    maxWidth: 120,
    maxHeight: 140,
    marginLeft: "auto",
    marginRight: "auto"
  },
  media: {
    marginTop: 10,
    marginLeft: 25,
    height: 70,
    width: 70,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={Image}
        title="User"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" align="center" style={{fontFamily:'Roboto'}}>
          User 1
        </Typography>
      </CardContent>
    </Card>
  );
}
