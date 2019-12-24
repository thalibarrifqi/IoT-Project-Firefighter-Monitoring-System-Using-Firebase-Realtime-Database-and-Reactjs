import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from './card';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h5" style={{marginTop: 20}} gutterBottom>
          Fire Fighter Monitoring
        </Typography>
      <Card/>

      </Container>
    </React.Fragment>
  );
}
