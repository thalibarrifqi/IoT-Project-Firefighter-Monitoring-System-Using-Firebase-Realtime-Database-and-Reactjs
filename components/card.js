import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from './resource/icon-orang-png.png'

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
  },
  media: {
    marginTop: 10,
    height: 140,
    width: 140,
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
        <Typography gutterBottom variant="h5" component="h2">
          User 1
        </Typography>
      </CardContent>
      
      <CardActions>
        <Button size="small" color="primary">
          Detail
        </Button>
      </CardActions>

    </Card>
  );
}
