import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Flickr from './start/Flickr';
import apikey from './config.js';


class App extends Component {
  render() {
    return (
      <Flickr apikey={apikey}/>
    );
  }
}

export default App;
