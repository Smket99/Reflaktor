import React,{useState} from 'react'
import './Complaint.css'
import confirm from './Confirm.svg'
export default function Complaint(props){

  const [defaultValue,setDefaultValue]=useState()
  const [complaint,setComplaint]=useState('')
  const onSelect=(e)=>{
    setDefaultValue(e.target.value)
  }
  const handleChange=(e)=>{
    setComplaint(e.target.value)
  }
  const registerComplaint=()=>{
    const notice={
      notice:complaint,
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notice)
    };
    fetch('/notice', requestOptions)
    .then((res)=>{
      console.log(res)
    }).catch(error=>{
      console.log(error)
    })
    console.log(notice)
    document.getElementById('complaint-cont').classList.add("move-away");
    document.getElementById('success-msg').classList.add("move-in");
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
          <b style={{fontSize:'200%'}}>Notification</b>
        </div>
        <div id="complaint-cont" style={{zIndex:'1',height:'100%',width:'100%'}} className="basic">

          <textArea
            id="complaint"
            placeholder="Write notification here......"
            onChange={handleChange}
            value={complaint}

            ></textArea>
          <button onClick={()=>registerComplaint()}>Notify</button>
        </div>
        <div id="success-msg" className="basic success-msg">
          <img src={confirm}/><h2 style={{fontFamily:'Roboto',margin:'0.5em'}}>Notification added!</h2>
          <button onClick={()=>openNew()}>New</button>
        </div>
      </div>

    </div>
  )
}
