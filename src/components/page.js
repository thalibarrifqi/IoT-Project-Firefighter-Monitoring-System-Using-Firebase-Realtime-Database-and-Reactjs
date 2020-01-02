import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Content from './maincontent';
import Time from './time.js'

export default function SimpleContainer() {
  return (

    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" style={{backgroundColor: '#fff8dc'}}>
        <Typography variant="h5" style={{fontFamily:'Helvetica'}}>
          Fire Fighter Monitoring
        </Typography>
        <Time />
        <Content/>        
      </Container>
    </React.Fragment>
  );
}
