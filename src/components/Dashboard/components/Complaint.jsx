import React,{useState} from 'react'
import './Complaint.css'
import confirm from './Confirm.svg'
export default function Complaint(props){
  var userData=JSON.parse(localStorage.getItem('currStudentUser'))
  const [defaultValue,setDefaultValue]=useState()
  const [complaint,setComplaint]=useState('')
  const onSelect=(e)=>{
    setDefaultValue(e.target.value)
  }
  const handleChange=(e)=>{
    setComplaint(e.target.value)
  }
  const registerComplaint=()=>{
    if(complaint==="")
    {
      alert("Complaint cannot pe empty")
    }
    else if(defaultValue==='Select'){
      alert("Please select a department")
    }
    else
    {
      const studentComplaint={
        dept:defaultValue,
        issue:complaint,
        email:userData.email
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentComplaint)
      };
      fetch('/complaints', requestOptions)
      .then((res)=>{
        console.log(res)
      }).catch(error=>{
        console.log(error)
      })
      console.log(studentComplaint)
      document.getElementById('complaint-cont').classList.add("move-away");
      document.getElementById('success-msg').classList.add("move-in");
      document.getElementById('selector').value="Select";
      document.getElementById('complaint').value="";
    }

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
        <div id="complaint-cont" style={{zIndex:'1',borderRadius:'5px',height:'100%',width:'100%'}} className="basic">
          <select id="selector" onChange={onSelect} value={defaultValue}>
            <option>Select</option>
            <option>Electrician</option>
            <option>Carpenter</option>
            <option>IT</option>
            <option>Plumber</option>
            <option>Warden</option>
          </select>
          <textArea
            id="complaint"
            placeholder="Write your issue here......"
            onChange={handleChange}
            value={complaint}

            ></textArea>
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
