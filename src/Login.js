import React, { Component } from 'react';
import fire from './config.js';
import { Paper} from '@material-ui/core';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
        alert(error)
      });
  }

  render() {
     
    return (
       <div className="col-md-6">
            <Paper align="center" style={{width: 200, height: 200}}>
                <form>
                <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control"    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password"       class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
                </form>
            </Paper>
        </div>
    );
  }
}
export default Login;