import React from 'react'
import './Complaint.css'
import confirm from './Confirm.svg'
export default function Complaint(){

  const registerComplaint=()=>{
    document.getElementById('complaint-cont').classList.add("move-away");
    document.getElementById('success-msg').classList.add("move-in");
    document.getElementById('selector').value="Select";
    document.getElementById('complaint').value="";
  }
  const openNew=()=>{
    document.getElementById('complaint-cont').classList.remove("move-away");
    document.getElementById('success-msg').classList.remove("move-in");
  }
  return (
    <div className="basic" style={{zIndex:'20',width:'100%',minHeight:'100vh'}}>
      <div className="basic complaint-wrapper">
        <div className="basic topper">
          <b style={{fontSize:'200%'}}>Complaint</b>
        </div>
        <div id="complaint-cont" style={{zIndex:'1',height:'100%',width:'100%'}} className="basic">
        <select id="selector">
          <option>Select</option>
          <option>Electrician</option>
          <option>Carpenter</option>
          <option>IT</option>
          <option>Plumber</option>
          <option>Warden</option>
        </select>
        <textArea id="complaint" placeholder="Write your issue here......"></textArea>
        <button onClick={()=>registerComplaint()}>Submit</button>
        </div>
        <div id="success-msg" className="basic success-msg">
          <img src={confirm}/><h2 style={{fontFamily:'Roboto',margin:'0.5em'}}>Complaint registered successfully</h2>
          <button onClick={()=>openNew()}>New</button>
        </div>
      </div>

    </div>
  )
}
