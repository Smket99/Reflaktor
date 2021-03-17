import React from 'react'
export default function Notification(){
  const notifs=[
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 4",
    "Notification 5",
  ];
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',background:"pink",width:'100%',height:'100vh'}}>
      <h1>Notification Centre</h1>
      <div style={{height:'50vh',display:'flex',flexDirection:'column',alignItems:'center',width:'70%'}}>
        {notifs.map((item)=>
            <div style={{margin:'1em',boxShadow:'0 4px 8px #00000056, 0 6px 20px 0 #00000056',paddingLeft:'0.5em',position:'relative',background:'white',width:'50%',minHeight:'20%'}}>
              <div style={{background:'indianred',height:'100%',width:'0.4em',position:'absolute',left:'0px'}}></div>
              {item}</div>
          )
      }

      </div>
    </div>
  )
}
