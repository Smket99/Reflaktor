import React from 'react'
import './history.css'
import logData from './data'
import Filter from './Filter.svg'
import Plumber from "./Plumber.svg"
import IT from "./IT.svg"
import Carpenter from "./Carpenter.svg"
import Electrician from "./Electrician.svg"
import { FaStar } from 'react-icons/fa'
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
      rating:null,
      comment:null,
      data:logData,
      data2:logData,
      value:"All",
      showFilters:false,
      studentData:{
        email:"",
        id:"",
        name:"",
        room_no:"",
        phone_number:"",
        address:"",
        hostel:"",
        dob:new Date()
      },
      page_no:1,
    }
  }
  componentDidMount(){
    fetch(`/complaints`,{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({email:this.props.email})
    }).then(res=>{
      if(res.ok){
        return res.json()
      }
    }).then(json=>{
      // console.log("Lion")
      // console.log(json)
      this.setState({data2:json})
      this.setState({
        data:json
      })
    }).catch(e=>{
      console.log(e);
    })
  }
  
  render(){
    const toggleFilters=()=>{
      this.setState({showFilter:!this.state.showFilter});
    }

    const handlePageChange = (e) => {
      const num = e.target.id === "next" ? 1 : -1;
      const temp = this.state.page_no;
      this.setState({ page_no: temp + num });
      fetch(`/complaints?page=${this.state.page_no + num}&limit=${10}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({email:this.props.email})
      }).then(res => {
        if (res.ok) {
          return res.json()
        }
      }).then(json => {
        console.log(json);
        this.setState({
          data2: json
        })
        this.setState({
          data: json
        })
      }).catch(e => {
        console.log(e);
      })
    }

    const filterStatus=()=>{
      console.log('%c.', 'font-size: 1px; line-height: 140px; padding: 70px 125px; background: url("https://media.giphy.com/media/r1HGFou3mUwMw/giphy-downsized.gif");');
      this.setState({data:this.state.data2})
      let    x=document.getElementById("filter-stat").value
      let    y=document.getElementById("filter-dep").value
      var temp=[]
      var xx=false
      if(x==="Resolved")
      xx=true;
      for(var i=0;i<this.state.data2.length;i++){
        if((this.state.data2[i].resolved===xx||x==="All")&&(this.state.data2[i].dept===y||y==="All"))
        {
          temp[i]=this.state.data2[i]
        }
        else{
          temp[i]=null
        }
      }
      this.setState({data:temp})
    }
    const deleteComplaint=(id,rating,comment)=>{
      console.log(id,rating,comment);
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch('/students/'+id, requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        this.setState({
          studentData:data
        })
      }).catch(error=>{
        console.log(error)
      })
      var x=document.getElementById('cont')
      if(x.style.overflow=="hidden")
      x.style.overflow="auto"
      else {
        x.style.overflow="hidden"
      }
      this.setState({showModal:!this.state.showModal,CompId:id,rating:rating,comment:comment})
      window.location.href = "#modal";
    }
    const Active=(info)=>{
      console.log(info);
      return (
        <tr className="logs">
          <td><img src={Image(info.dept)}/></td>
          <td>
            {info.issue}
          </td>
          <td>{info.date}</td>
          <td>  <div style={{minWidth:'100%'}} className="status active-log">{info.resolved?"Resolved":"Active"}</div></td>
          <td className="basic">
            <button id={info.email} onClick={()=>deleteComplaint(info.email,info.rating,info.comment)}>{info.email}</button>
          </td>
        </tr>
      )
    }
    const resolved=(info)=>{
      console.log(info)
      return(
        <tr className="logs">
          <td><img src={Image(info.dept)}/></td>
          <td>
            {info.issue}
          </td>
          <td>{info.date}</td>
          <td > <p style={{minWidth:'100%'}} className="status resolved-log">{info.resolved?"Resolved":"Active"}</p></td>
          <td className="basic">
            <button id={info.email} onClick={()=>deleteComplaint(info.email,info.rating,info.comment)}>{info.email}</button>
          </td>
        </tr>
      )
    }
    var obj=[];
    if(this.state.data!=null)
    for(var i=0;i<this.state.data.length;i++)
    {
      if(this.state.data[i]!==null)
      {
        if(this.state.data[i].resolved)
        obj.push(resolved(this.state.data[i]));
        else {
          obj.push(Active(this.state.data[i]));
        }
      }
    }
    return (
      <div id="cont" style={{position:'relative',width:'100%',minHeight:'100vh'}}>
        <div style={{height:'100vh',position:'absolute'}}  className={this.state.showModal?"modal basic":"modal-hide "}>
          <div className="modal-container">
            <button style={{background:'indianred'}} onClick={deleteComplaint}>X</button>
            <h1>Student Details</h1>
            <div style={{fontSize:'150%',borderRadius:'10px',color:'#fff',background:'linear-gradient(to bottom,#642B73,#C6426E)',padding:'1em'}}>
              <img style={{height:'50%',borderRadius:'50%'}} src={this.state.studentData.imageUrl}/>

              <p><strong>Name: </strong>{this.state.studentData.name}</p>
              <p><strong>ID: </strong>{this.state.studentData.id}</p>
              <p><strong>Email: </strong>{this.state.studentData.email}</p>
              <p><strong>Mob: </strong>{this.state.studentData.phone_number}</p>
              <p><strong>Hostel: </strong>{this.state.studentData.hostel}</p>
              <p><strong>Room No: </strong>{this.state.studentData.room_no}</p>
              <p><strong>Rating to this complaint: </strong> <FaStar size={20} style={{marginUp:"10px"}}value="1star" color="#f5bc42" /> {this.state.rating}</p>
              <p><strong>Additional comment: </strong>{this.state.comment}</p>
            </div>
          </div>
        </div>
        <nav className="basic nav" style={{background:'#212121',width:'100%',height:'3em'}}>
          <button style={{background:'none',border:'none',outline:'none',cursor:'pointer'}} onClick={toggleFilters}><img src={Filter} style={{height:'15%'}}/></button>
        </nav>
        <div style={{paddingTop:'3em',overflow:'hidden',width:'100%',position:'relative',display:'flex',minHeight:'calc(100vh - 3em)'}}>
          <table className="desktop-table">
            <tr style={{background:'pink'}}>
              <th>Department</th>
              <th>Issue</th>
              <th>Date</th>
              <th>Status</th>
              <th>Student</th>
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
        <div>
          <button id="prev" onClick={handlePageChange} style={{ margin: "20px", display: this.state.page_no === 1 ? "none" : "", width: "150px", height: "50px", border: 'none', outline: 'none', cursor: 'pointer' }} className="button-yes">Prev</button>
          <button id="next" onClick={handlePageChange} style={{ margin: "20px", marginLeft: "60em", display: this.state.data.length < 10 ? "none" : "", width: "150px", height: "50px", border: 'none', outline: 'none', cursor: 'pointer' }} className="button-yes">Next</button>
        </div>
      </div>
    )
  }
}
