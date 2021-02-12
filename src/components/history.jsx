import React from 'react'
import './history.css'
import data from './data'
export default function App(){
  const Active=(info)=>{
    return (
      <div className="active logs">
      <img src={info.to+".jpg"} className="cover"/>
      {info.query}
      <br/>
      {info.Date}
      <button>Delete</button>
      </div>
    )
  }
  const Completed=(info)=>{
    return(
      <div className="completed logs">
  <img src={info.to+".jpg"}  className="cover"/>
  {info.query}
  <br/>
  {info.Date}
      </div>
    )
  }
  var obj=[];
  for(var i=0;i<data.length;i++)
  {
    if(data[i].status=="completed")
    obj.push(Completed(data[i]));
    else {
      obj.push(Active(data[i]));
    }
  }
  return (
    <div className="basic" style={{flexDirection:'row',width:'100%',height:'100vh',background:'white'}}>
      {obj}
    </div>
  )
}
