import { Grid, Paper, Typography } from "@material-ui/core";
import Card from './card'
import React, {Component} from 'react';
import firebaseConnect from '../config';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts/dist/apexcharts.common';
import {Marker, GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps';
import {compose} from 'recompose';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import markred from './resource/red.png';
import markblue from './resource/blue.png';

var lastDate = 0;
var data = []
var TICKINTERVAL = 1000
let XAXISRANGE = 10000
var heartt
var dataLong
var dataLat
var switchh
var iconMap

function getDayWiseTimeSeries(baseval, count) {
    var i = 0;
    while (i < count) {
        var x = baseval;
        var y = heartt;

        data.push({
            x, y
        });
        lastDate = baseval
        baseval += TICKINTERVAL;
        i++;
    }
}

getDayWiseTimeSeries(new Date().getTime(), 10)

function getNewSeries(baseval) {
    var newDate = baseval + TICKINTERVAL;
    lastDate = newDate
    for(var i = 0; i< data.length - 10; i++) {
        data[i].x = newDate - XAXISRANGE - TICKINTERVAL
        data[i].y = heartt
    }
    
    data.push({
        x: newDate,
        y: heartt
    })
    
}

const style={
    Paper: {padding: 10, marginTop: 10, marginBottom: 10, marginRight: 10, minHeight: 160, minWidth: 100}
}

class getData extends Component {
    constructor(props){
        super(props)

        this.app=firebaseConnect;
        this.database=this.app.database().ref('1/');

        this.state={
            heart: [],
            statheart: [],
            long: [],
            lat: [],
            switch:[],
            options: {
                chart: {
                    id: 'realtime',
                    animations: {
                      enabled: true,
                      easing: 'linear',
                      dynamicAnimation: {
                        speed: 1000
                      }
                    },
                    toolbar: {
                      show: false
                    },
                    zoom: {
                      enabled: false
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth'
                  },
                  markers: {
                    size: 1
                  },
                  xaxis: {
                    type: 'datetime',
                    range: XAXISRANGE,
                  },
                  yaxis: {
                    max: 1024
                  },
                  legend: {
                    show: false
                  }
              },
              series: [{
                data: data
              }],
        }
    }

    componentDidMount(){
        this.database.on('value', snapshot=> {
            console.log(snapshot.val())
            dataLat = snapshot.val().GPS.latitude
            dataLong = snapshot.val().GPS.longitude 
            heartt = snapshot.val().HeartRate.value
            switchh = snapshot.val().Switch
            this.setState({
                long: snapshot.val().GPS.longitude,
                lat: snapshot.val().GPS.latitude,
                heart: snapshot.val().HeartRate.value,
                statheart: snapshot.val().HeartRate.Status,
            })
        })
        this.intervals()
    }

    cekHeart(){
      if(heartt<=300 || heartt>=700){
        return (
          <Paper style={{backgroundColor:'#fff000', marginTop: 20}}>
            <Typography variant="h6">
              Tidak Normal
              <WarningIcon/>
            </Typography>
          </Paper>
        )
      }else {
        return (
          <Paper style={{backgroundColor:'#00f0ff', marginTop: 20}}>
            <Typography variant="h6">
              Normal
              <CheckCircleIcon/>
            </Typography>
          </Paper>
        )
      }
    };

    cekFlag(){
      if(switchh===1){
        return (
          <Paper style={{backgroundColor:'#ff0000', marginTop: 20}}>
            <Typography variant="h6">
              Help!
              <ErrorIcon/>
            </Typography>
          </Paper>
        )
      }else{
        return (
          <Paper style={{backgroundColor:'#00f0ff', marginTop: 20}}>
            <Typography variant="h6">
              Safe
              <CheckCircleIcon/>
            </Typography>
          </Paper>
        )
      }
    }

    intervals () {
        window.setInterval(() => {
          getNewSeries(lastDate)
          ApexCharts.exec('realtime', 'updateSeries', [{
            data: data
          }])
        }, 1000)
      }

    render(){
    var markers=[
      {
        position: { lng: dataLong, lat: dataLat},
        names: 'user_1'
      }
    ];

    if (switchh===1) {
      iconMap=markred
    }else
      iconMap=markblue
  
    console.log(markers.position);

    const MapComponent = compose(
        withScriptjs,
        withGoogleMap
    )(({ lng, lat }) => (
      <GoogleMap defaultZoom={20} defaultCenter={{lng: dataLong, lat: dataLat}}>
       {markers.map((value, index) => {
            console.log(index, value.names, value.position);
             return (
              <Marker 
              key ={value.names} 
              position={value.position}
              icon={iconMap}
              />
             );
         })}
      
      </GoogleMap>
    ));
    return(
      <Grid container>

        <Grid item md>
            <Paper style={style.Paper}>
                <Card/>
            </Paper>
        </Grid>

        <Grid item md>
            <Paper style={style.Paper}>
              <Typography variant="h5" align="center" style={{fontFamily:'Helvetica'}}>
                Profile
              </Typography>
                <ul >
                  <li>Nama :</li>
                  <li>Usia :</li>
                  <li>Unit :</li>
                </ul>
            </Paper>
        </Grid>

        <Grid item md>
            <Paper style={style.Paper}>
              <Typography variant="h5" align="center" style={{fontFamily:'Helvetica'}}>
                Condition
              </Typography>
              <Typography variant="h6" align="center" style={{fontFamily:'Helvetica'}}>
                {this.cekHeart()}
              </Typography>
            </Paper>
        </Grid>

        <Grid item md>
            <Paper style={style.Paper}>
              <Typography variant="h5" align="center" style={{fontFamily:'Helvetica'}}>
                Emergency
              </Typography>
              <Typography variant="h6" align="center" style={{fontFamily:'Helvetica'}}>
                {this.cekFlag()}
              </Typography>
            </Paper>
        </Grid>
 

        <Grid item md>
            <Paper style={style.Paper}>
            <Typography variant="h6" style={{fontFamily:'Helvetica'}}>
               Status: {this.state.statheart}
            </Typography> 
            <Typography variant="h6" style={{fontFamily:'Helvetica'}}>
                Heart Rate: {this.state.heart}
            </Typography> 
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" width="600" height="250" />               
            </Paper>
        </Grid>

        <Grid item md>
            <Paper style={style.Paper}>
                <div style={{width: '57vw', height : '60vh'}}> 
                    <p>Location : {this.state.lat} , {this.state.long}</p>
                    <MapComponent googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDacw__T06ipMtSwGDzrnDDd4WxDPHsxBc`}
                    loadingElement={<div style={{ height: `90%` }} />}
                    containerElement={<div style={{ height: `90%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </Paper>
        </Grid>

    </Grid>
  )
    }
}

export default getData;