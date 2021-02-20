import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Student from './components/Dashboard/App'
import Admin from './components/admin'
import Login from './components/Login/app'
import {BrowserRouter as Router, Route,NavLink} from 'react-router-dom'
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={App}/>
      <Route  path="/student" component={Student}/>
      <Route  path="/admin" component={Admin}/>
      <Route  path="/login" component={Login}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
