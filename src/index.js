import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Student from './components/student'
import History from './components/history'
import Admin from './components/admin'
import Login from './components/Login/app'
import {BrowserRouter as Router, Route,NavLink} from 'react-router-dom'
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div style={{background:'black',fontSize:'30px',color:'dodgerblue',width:'100%'}}>
      <NavLink style={{margin:'1em',color:'dodgerblue'}} to="/student">Student</NavLink>
      <NavLink style={{margin:'1em',color:'dodgerblue'}} to="/admin">Admin</NavLink>
      <NavLink style={{margin:'1em',color:'dodgerblue'}} to="/login">Login</NavLink>
      </div>
      <Route exact path="/" component={App}/>
      <Route  path="/student" component={Student}/>
      <Route  path="/admin" component={Admin}/>
      <Route  path="/login" component={Login}/>
      <Route  path="/student/history" component={History}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
