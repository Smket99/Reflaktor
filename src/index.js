import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Student from './components/Dashboard/App'
import Admin from './components/Admin/App'
import Login from './components/Login/app'
import {BrowserRouter as Router, Route,NavLink} from 'react-router-dom'
import Root from './Root';
ReactDOM.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);
