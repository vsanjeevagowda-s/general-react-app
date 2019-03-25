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
    this.openFile = this.openFile.bind(this);
    this.openFile = this.openFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.openFolder = this.openFolder.bind(this);
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
  };

  openFile = () => {
    dialog.showOpenDialog((fileNames) => {
      fs.readFile(fileNames[0], 'utf-8', (error, data) => {
        this.setState({
          dataFromFile: data,
        })
      })
    })
  };

  deleteFile = () => {
    if (fs.existsSync(localStorage.getItem('filename'))) {
      fs.unlink(localStorage.getItem('filename'), (err) => {
        if (err) {
          alert("An error ocurred updating the file" + err.message);
          console.log(err);
          return;
        }
        console.log("File succesfully deleted");
      });
    } else {
      alert("This file doesn't exist, cannot delete");
    }
  };

  openFolder = () => {
    dialog.showOpenDialog({
      title:"Select a folder",
      properties: ["openDirectory"]
  }, (folderPaths) => {
      if(folderPaths === undefined){
          console.log("No destination folder selected");
          return;
      }else{
          console.log(folderPaths);
      }
  });
  }

  render() {
    const { data, dataFromFile } = this.state;
    return (
      <div className="App">
        Save File<br />
        <textarea cols="20" rows="10" id="fileContent" onChange={this.InputChange} value={data}></textarea><br />
        <button onClick={this.saveFile}>SAVE</button><br />
        <button onClick={this.openFile}>OPEN FILE</button><br />
        <button onClick={this.deleteFile}>DELETE FILE</button><br />
        <button onClick={this.openFolder}>OPEN FOLDER</button>
        <p>{dataFromFile}</p>
      </div>
    );
  }
}

export default App;
