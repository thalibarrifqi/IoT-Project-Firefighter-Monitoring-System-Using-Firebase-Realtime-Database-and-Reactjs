import React, {Component} from 'react';
import firebase from 'firebase';
import {firebaseConfig} from '../config';

class getData extends Component {
    constructor(){
        super()

        this.app=firebase.initializeApp(firebaseConfig);
        this.database=this.app.database().ref('user1/');

        this.state={
            long: [],
            lat: [],
            heart: []
        }
    }

    componentDidMount(){
        this.database.on('value', snapshot=> {
            console.log(snapshot.val())
            this.setState({
                long: snapshot.val().gps.longitude,
                lat: snapshot.val().gps.latitude,
                heart: snapshot.val().heartrate
            })
        })
    }

    render(){
        return(
            <div>
                <p>
                    Location : {this.state.long},{this.state.lat}
                </p>
                <p>
                    Heart Rate : {this.state.heart}
                </p>
            </div>
        )
    }
}

export default getData;