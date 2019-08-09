import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

//bootstrap load
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

//Components
import {Nav} from './ComponentList';

class App extends React.Component{
  render(){
    return(
      <Nav/>
    );
  }
}

export default App;
