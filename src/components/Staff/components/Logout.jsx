import React from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
export default function Complaint(){
return (
  <div style={{width:'100%',height:'100vh'}} className="basic">
    <div style={{padding:'3em',borderRadius:'20px',boxShadow:'0 4px 6px #00000056,0 6px 20px 0 #00000056'}} className="basic">
    <h1>Do you really want to logout?</h1>
    <div>
    <button style={{margin:'1em',outline:'none',cursor:'pointer',border:'none',padding:'4px 10px',background:"dodgerblue",fontSize:'25px',color:'white'}} onClick={()=>{localStorage.removeItem("currAdminUser");window.location.href="/"}}>
      Yes
    </button>
    <button style={{margin:'1em',outline:'none',cursor:'pointer',border:'none',padding:'4px 10px',background:"indianred",fontSize:'25px',color:'white'}} onClick={()=>window.location.href="/student/Profile"}>
      No
    </button>
    </div>
    </div>
  </div>
)
}
