import React, { Component } from 'react';
import './App.css';
const electron = window.require('electron');
const { dialog } = electron.remote;
const fs = electron.remote.require('fs');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
    this.saveFile = this.saveFile.bind(this);
    this.InputChange = this.InputChange.bind(this);
    this.readFile = this.readFile.bind(this);
    this.getStringFromCharCode = this.getStringFromCharCode.bind(this);
  }

  InputChange = (event) => {
    this.setState({
      data: event.target.value,
    });
    console.log(this.state, 'state');
  }

  saveFile = () => {
    const { data } = this.state;
    dialog.showSaveDialog((filename) => {
      localStorage.setItem('filename', filename);
      fs.writeFile(filename, data, (err, message) => {
        alert('File saved successfully!!');
      })
    })
  }

  getStringFromCharCode = (str, i) => {
    return str + String.fromCharCode(i);
  };

  readFile = () => {
    fs.readFile(localStorage.getItem('filename'), (error, data) => {
      console.log(data,'data');
      console.log(error,'error');
        this.setState({
          dataFromFile: data.reduce(this.getStringFromCharCode, ''),
      })
    })
  }
  render() {
    const { data, dataFromFile } = this.state;
    return (
      <div className="App">
        Save File<br />
        <textarea cols="20" rows="10" id="fileContent" onChange={this.InputChange} value={data}></textarea><br />
        <button onClick={this.saveFile}>SAVE</button><br />
        <button onClick={this.readFile}>READ FILE</button>
        <p>{dataFromFile}</p>
      </div>
    );
  }
}

export default App;
