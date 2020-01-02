import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from './config.js';
import NavBar from './components/navbar.js'
import Page from './components/page.js'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import App from './App';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        fire.auth().signOut();
        return ReactDOM.render(<App />, document.getElementById('root'))
        
    }

    render() {
        return (
        <div>
            <NavBar/>
                <Toolbar>
                    <Button onClick={this.logout} color="inherit">Logout</Button>
                </Toolbar>    
            <Page/>
        </div>
        )
    }
}
export default Home;
