import React from 'react'
import './history2.css'
import './history.css'
import logData from './data'
import Plumber from "./Plumber.svg"
import IT from "./IT.svg"
import Carpenter from "./Carpenter.svg"
import Electrician from "./Electrician.svg"
function Image(x)
{
  if(x==="Plumber")
  return Plumber;
  if(x==="IT")
  return IT;
  else if(x==="Electrician")
  return Electrician;
  else {
    return Carpenter;
  }
}
export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showModal:false,
      CompId:"none",
      data:logData,
      value:"All",
      showFilters:false
    }
  }
  render(){
    const markResolved=(id)=>{
      this.setState({CompId:id});
      var temp=this.state.data;
      for(var i=0;i<temp.length;i++)
      {
        if(temp[i]!=null&&temp[i].id==id)
        {
          temp[i].status="resolved"
          break;
        }
      }
      this.setState({data:temp});
    }
    const toggleFilters=()=>{
      this.setState({showFilter:!this.state.showFilter});
    }
    const del=()=>{
      var temp=this.state.data;
      for(var i=0;i<temp.length;i++)
      {
        if(temp[i]!=null&&temp[i].id===this.state.CompId)
        {
          temp[i]=null
          break;
        }
      }
      this.setState({data:temp});
      this.setState({showModal:!this.state.showModal})
      console.log(this.state.data);
    }
    const filterStatus=()=>{
      this.setState({data:logData})
      let    x=document.getElementById("filter-stat").value
      let    y=document.getElementById("filter-dep").value
      var temp=[];
      for(var i=0;i<logData.length;i++)
      {
        if((logData[i].status===x.toLowerCase()||x==="All")&&(logData[i].to===y||y==="All"))
        {
          temp[i]=logData[i];
        }
        else {
          temp[i]=null;
        }
      }
      this.setState({data:temp});
    }
    const deleteComplaint=(id)=>{

      this.setState({showModal:!this.state.showModal,CompId:id})
      window.location.href = "#modal";
    }
    const Active=(info)=>{
      return (
        <tr className="logs">
          <td><img src={Image(info.to)}/></td>
          <td>
            {info.query}
          </td>
          <td>{info.Date}</td>
          <td>  <div className="status active-log">{info.status}</div></td>
            <td className="basic">
              <button onClick={()=>deleteComplaint(info.id)}>Delete</button>
              <button id="done-but" onClick={()=>markResolved(info.id)}>Resolve</button>
            </td>
        </tr>
      )
    }
    const resolved=(info)=>{
      return(
        <tr className="logs">
          <td><img src={Image(info.to)}/></td>
          <td>
            {info.query}
          </td>
          <td>{info.Date}</td>
          <td> <p className="status resolved-log">{info.status}</p></td>
          <td className="basic">
            <button onClick={()=>deleteComplaint(info.id)}>Delete</button>
            <button disabled id="done-but" onClick={()=>markResolved(info.id)}>Resolve</button>
          </td>

        </tr>
      )
    }
    var obj=[];
    for(var i=0;i<this.state.data.length;i++)
    {
      if(this.state.data[i]!==null)
      {
        if(this.state.data[i].status=="resolved")
        obj.push(resolved(this.state.data[i]));
        else {
          obj.push(Active(this.state.data[i]));
        }
      }
    }
    return (
      <div style={{position:'relative',width:'100%'}}>
        <nav className="basic nav" style={{background:'#212121',width:'100%',height:'3em'}}>
          <button onClick={toggleFilters}>Filters</button>
        </nav>
        <div style={{paddingTop:'3em',overflow:'hidden',width:'100%',position:'relative',display:'flex'}}>

          <div  className={this.state.showModal?"modal basic":"modal-hide"}>
            <div  className="modal-container">
              <h1 id="modal">
                Do you really want to delete this Complaint?
              </h1>
              <button  onClick={del} className="button-yes">
                Yes
              </button>
              <button onClick={deleteComplaint} className="button-no">
                No
              </button>
            </div>
          </div>


          <table className="desktop-table">
            <tr style={{background:'pink'}}>
              <th>Department</th>
              <th>Issue</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {obj}
          </table>
          <table id="mobtable" className="mobile-table">
            {obj}
          </table>

          <div className={this.state.showFilter?"filters showFilter":"filters hideFilter"}>
            <h1 style={{margin:'0.5em'}}>Filters</h1>
            <div>
              <label htmlFor="filer-dep">Status</label>
              <select id="filter-stat" onChange={()=>filterStatus()}>
                <option>All</option>
                <option>Active</option>
                <option>Resolved</option>
              </select>
            </div>
            <div>
              <label htmlFor="filer-dep">Department</label>
              <select id="filter-dep" onChange={()=>filterStatus()}>
                <option>All</option>
                <option>IT</option>
                <option>Carpenter</option>
                <option>Electrician</option>
                <option>Plumber</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
