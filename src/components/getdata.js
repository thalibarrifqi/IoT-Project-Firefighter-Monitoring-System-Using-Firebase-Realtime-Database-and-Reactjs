import React, {Component} from 'react';
import firebase from 'firebase';
import {firebaseConfig} from '../config';

class getData extends Component {
    constructor(){
        super()

        this.app=firebase.initializeApp(firebaseConfig);
        this.database=this.app.database().ref('user_1/');

        this.state={
            long: [],
            lat: [],
            heart: [],
            switch:[]
        }
    }

    componentDidMount(){
        this.database.on('value', snapshot=> {
            console.log(snapshot.val())
            this.setState({
                long: snapshot.val().GPS.longitude,
                lat: snapshot.val().GPS.latitude,
                heart: snapshot.val().Heart_Rate.heart_rate,
                switch: snapshot.val().Flag.Switch
            })
        })
    }

    render(){
        return(
            <div>
                <h1>
                    {this.state.long}
                <h1>
                </h1>
                    {this.state.lat}
                </h1>
                <h1>
                    {this.state.heart}
                </h1>
                <h1>
                    {this.state.switch}
                </h1>
            </div>
        )
    }
}

export default getData;