import React,{useState} from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
export default function Complaint(){
  const options = [
    'Electrician', 'Carpenter', 'Warden','Hostel Rep','Bhavish Pahwa'
  ];
  const [defaultValue,setDefaultValue]=useState()
  const [complaint,setComplaint]=useState('')
  const [submitted,setSubmitted]=useState(false)
  const onSelect=(e)=>{
    setDefaultValue(e.value)
  }
  const handleChange=(e)=>{
    console.log(e.target.value)
    setComplaint(e.target.value)
  }
  const [issue,setIssue]=useState({
    service:'',
    complaint:''
  })
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(defaultValue===undefined){
      alert("Please choose a service...")
    }
    else if(complaint===''){
      alert("Please describe your issue")
    }
    else{
     setIssue({
        service:defaultValue,
        complaint:complaint
      })
      setComplaint('')
      setDefaultValue()
      // console.log(issue)
      setSubmitted(true)
    }

    

  }
  const handleNewComplaint=(e)=>{
    setSubmitted(false)
  }

  return (
    <>
    {!submitted && <div className='basic' style={{minHeight:'100vh',position:'relative'}}>
      <h1 style={{position:'absolute',top:'90px',left:'50%', transform:'translate(-50%,-50%) scale(1.2)'}}>Complaint Box</h1>
      <div className='basic' style={{boxShadow:'0 4px 8px 0 #00000056, 0 6px 20px 0 #00000056',borderRadius:'15px',margin:'1em', padding:'20px', background:'#fff', alignItems:'center', alignContent:'center', justifyContent:''}}>
          <h3 style={{margin:'1em'}}>Which service you'll be needing?</h3>
          <Dropdown style={{}} options={options} onChange={onSelect} value={defaultValue} placeholder="Select an option" placeholder='which service you are looking for?'/>
      
          <textarea
          value={complaint}
          style={{width:'500px', height:'200px', fontSize:'30px',margin:'1em'}}
          onChange={handleChange}
          placeholder='Describe your issue'
          ></textarea>
          <button onClick={handleSubmit}
          style={{marginTop:'1em'}}
          style={{ borderRadius:'20px' , background:'dodgerblue',color:'white',border:'none',outline:'none',cursor:'pointer', width:'100px', height:'30px'}}
          
          >Submit</button>
        </div>
      </div>}

      {submitted && <div className="basic" style={{padding:'10px', margin:'30px',borderRadius:'5px',background:'#1e90ff36'}}>
          <h1 style={{marginRight:'1em'}}>Your complaint is sent to the {issue.service}</h1><br/>
          <h2 style={{marginRight:'1em'}}>Comment: {issue.complaint}</h2><br></br>
          <button onClick={handleNewComplaint}
          style={{marginTop:'1em'}}
          style={{ borderRadius:'5px' , padding:"10px",background:'#1e90ffd6',color:'white',border:'none',outline:'none',cursor:'pointer'}}
          
          >Write a new complaint</button>
        </div>}
    </>
  )
}
