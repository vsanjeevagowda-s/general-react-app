import React, { Component } from 'react';
import './App.css';
import * as API from './socket-api';

class App extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.state = {
      a: 0,
      b: 0,
      sum: 0,
      fetchResponse: '',
      fetchResponseTime: '',
      socketResponse: '',
      socketResponseTime: '',
    }
  }

  handleChange = (e) => {
    console.log('event.target', e.target.value);
    this.setState({
      [e.target.name]: parseInt(e.target.value),
    })
    console.log(this.state, '=>state');
  };

  onSubmitHandle = (e) => {
    e.preventDefault();
    const {a, b} = this.state;
    fetch(`${API.API_URL}/api/calc/sum`, { method: 'POST', body:  JSON.stringify({a, b}), headers:{
      'Content-Type': 'application/json'
    }})
    .then(res => res.json())
    .then(res => {
      this.setState({
        fetchResponse: res.message,
        fetchResponseTime: new Date().toLocaleString()
      })
    })
  }

  componentDidMount(){
    API.subscribe((result) => {
      console.log(result, '=> result');
      this.setState({sum: result, socketResponse: 'Socket response success!!', socketResponseTime: new Date().toLocaleString()});
    })
  };

  render() {
    const { a, b, sum, fetchResponse, socketResponse, socketResponseTime, fetchResponseTime } = this.state;
    return (
      <div className="App">
        <form>
          <label>
            A:
            <input type='number' name='a' value={a} onChange={this.handleChange}/>
          </label>
          <label><br/>
            B:
            <input type='number' name='b' value={b} onChange={this.handleChange}/>
          </label><br />
          <input type='submit' value='SUBMIT' onClick={this.onSubmitHandle}/><br /><br />
          <p>  fetchResponse: {fetchResponse}-{fetchResponseTime} </p>
          <p>  socketResponse: {socketResponse}-{socketResponseTime} </p><br/>
          <p> Result : {sum} </p>
          
        </form>
      </div>
    );
  }
}

export default App;
