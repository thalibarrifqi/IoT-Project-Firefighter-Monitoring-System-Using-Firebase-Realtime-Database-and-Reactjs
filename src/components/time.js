import React, {Component} from 'react';

class Clock extends Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date().toLocaleTimeString()
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      this.setState({
        time: new Date().toLocaleString()
      });
    }
    render() {
      return (
        <h3 className="App-clock">
        Time : {this.state.time}
        </h3>
      );
    }
  }

  export default Clock;
  