import React,{useState, useEffect} from 'react'
import './Notification.css'
export default function Notification(){
  const notifs=[
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 4",
    "Notification 5",
  ];
  const getColor=()=>{
    var x=parseInt(Math.floor(Math.random()*100000)%17);
    if(x%3==0)
    return '#0055ff'
    else if(x%3==1)
    return '#ff0251'
    else
    return '#ffab22'
  }
  const [notice,setNotice]=useState([]);
  useEffect(()=>{
    fetch('/notice',{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(response=>response.json())
    .then(data=>{
      data.sort((a, b) => {
        let da = new Date(a.date),
        db = new Date(b.date);
        return db - da;
      });
      setNotice(data)
      console.log(data)
    }).catch(error=>{
      console.log(error)
    })
  },[])
  return (
    <div  className="notification-container">
      <strong style={{fontFamily:'Abel',color:'#000',fontSize:'200%'}}>Notice</strong>
      {
        notice.map((item)=>
        <div style={{background:getColor(),position:'relative'}} className="notif-card">
          {item.notice}
          <div style={{position:'absolute',bottom:'5%',right:'3%',color:'white'}}>
            {item.date}
          </div>

        </div>
      )
    }

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
    </style>
  </div>
)
}
