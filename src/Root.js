import React, { useState } from 'react'
import Student from './components/Dashboard/App'
import Admin from './components/Admin/App'
import Login from './components/Login/app'
import App from './App'
import {BrowserRouter as Router, Route,NavLink} from 'react-router-dom'
function Root() {
console.log('%c.', 'line-height: 140px; padding: 40px 100px; background: url("https://media.tenor.com/images/75e495b108fc995f7a925b22093b1be3/tenor.gif");');
    const [userData,setUserData]=useState({
        email:"",
        name:"",
        imageUrl:"",
    });
    const setUserValue=(user)=>{
        setUserData(user);
        console.log(user);
        console.log(userData.email)
    }
    return (
        <div>
            <Router>
                 <Route  exact path="/">
                     <App/>
                 </Route>
                 <Route  path="/student" >
                     <Student userData={userData}/>
                 </Route>
                 <Route  path="/admin" >
                     <Admin userData={userData}/>
                 </Route>
                <Route path="/login">
                    <Login setUserData={setUserValue}/>
                </Route>
            </Router>
        </div>
    )
}

export default Root
