import React, { useState } from 'react'
import Student from './components/Dashboard/App'
import Admin from './components/Admin/App'
import Login from './components/Login/app'
import App from './App'
import {BrowserRouter as Router, Route,NavLink} from 'react-router-dom'
function Root() {
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
