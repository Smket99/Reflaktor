import React from 'react'
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
  return (
    <div  className="notification-container">
      <strong style={{fontFamily:'Abel',color:'#000',fontSize:'200%'}}>Notifications</strong>
      {
        notifs.map((item)=>
        <div   style={{background:getColor()}} className="notif-card">{item}</div>
      )
    }

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
    </style>
  </div>
)
}
