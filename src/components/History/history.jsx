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
  else{
    return Carpenter;
  }
}
var userData = JSON.parse(localStorage.getItem('currStudentUser'))
export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showModal:false,
      CompId:"none",
      data:logData,
      data2:logData,
      showFilters:false,
      modalContent:<div>Content</div>,
      page_no:1,
    }
  }
  componentDidMount(){

    fetch(`/complaints/${userData.email}?page=${this.state.page_no}&limit=${10}`,{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({email:this.props.email})
    }).then(res=>{
      if(res.ok){
        return res.json()
      }
    }).then(json=>{
      console.log(json);
      this.setState({
        data2:json.complaints
      })
      this.setState({
        data:json.complaints
      })
    }).catch(e=>{
      console.log(e);
    })
  }
  render(){
    const comp1=()=>{
    return (
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

    )
    }
    const comp2=(id)=>{
      const handleModalClose=()=>{
        this.setState({showModal:false});
      }
      return (
        <div  className="modal-container">
          <h1>Feedback Component</h1>
          <Feedback id={id} handleModalClose={handleModalClose}/>
          <button onClick={deleteComplaint} className="button-no">
            Cancel
          </button>
        </div>
      )
    }


    const Feedback = ({id,handleModalClose}) => {
      const [rating, setRating] = React.useState(null);
      const [comment, setComment] = React.useState("");

      const handleRating = (e) => {
        setRating(e.target.value);
      }
      const handleFeedbackSubmit = (e) => {
        const today = new Date().toLocaleString('en-US', { timeZone: "Asia/Kolkata" });
        const requestOptions = {
          method: 'PATCH',
          headers:
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rating: rating, comment: comment, resolved: true , id: id, dateResolved:today })
        };
        fetch(`/complaints/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            handleModalClose();
          })
      }
      const handleOnChange = (e) => {
        setComment(e.target.value)
      }

      return (
        <div style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-evenly' }} className="modal-container basic">
          <div style={{ justifyContent: 'space-evenly', height: '90%' }} className="basic">
            <textarea value={comment} onChange={handleOnChange} placeholder="Describe your experience (optional)" style={{ width: "300px", height: "120px", resize: "none" }}></textarea>
            <div style={{ margin: "1em", display: "flex", justifyContent: "center", alignItems: "center", width: '100%' }} >
              <label>
                <input type='radio' name="rating" value="1" style={{ display: "none" }} onClick={handleRating} />
                <FaStar size={25} value="1star" color={rating >= "1" ? "#f5bc42" : "grey"} />
              </label>
              <label>
                <input type='radio' name="rating" value="2" style={{ display: "none" }} onClick={handleRating} />
                <FaStar size={25} value="2star" color={rating >= "2" ? "#f5bc42" : "grey"} />
              </label>
              <label>
                <input type='radio' name="rating" value="3" style={{ display: "none" }} onClick={handleRating} />
                <FaStar size={25} value="3star" color={rating >= "3" ? "#f5bc42" : "grey"} />
              </label>
              <label>
                <input type='radio' name="rating" value="4" style={{ display: "none" }} onClick={handleRating} />
                <FaStar size={25} value="4star" color={rating >= "4" ? "#f5bc42" : "grey"} />
              </label>
              <label>
                <input type='radio' name="rating" value="5" style={{ display: "none" }} onClick={handleRating} />
                <FaStar size={25} value="5star" color={rating >= "5" ? "#f5bc42" : "grey"} />
              </label>
            </div>
            <button onClick={handleFeedbackSubmit} style={{background:"dodgerblue"}} className="button-no" variant="contained">Submit</button>
          </div>
        </div>
      )
    }





    // const markResolved=(id)=>{
    //   this.setState({CompId:id});
    //   var temp=this.state.data;
    //   for(var i=0;i<temp.length;i++)
    //   {
    //     if(temp[i]!=null&&temp[i]._id==id)
    //     {
    //       temp[i].resolved=true
    //       break;
    //     }
    //   }

    //   fetch('/complaints/'+id,{
    //     method:'PATCH',
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8"
    //     },
    //     body: JSON.stringify({
    //       resolved:true,
    //     })
    //   }).then(Response=>Response.json()).then(json=>{
    //     console.log(json)
    //   }).catch(e=>{
    //     console.log(e)
    //   })
    //   this.setState({data:temp});
    // }
    const toggleFilters=()=>{
      this.setState({showFilter:!this.state.showFilter});
    }

    const handlePageChange=(e)=>{
      const num=e.target.id==="next"?1:-1;
      const temp=this.state.page_no;
      this.setState({page_no:temp+num});
      fetch(`/complaints/${userData.email}?page=${this.state.page_no+num}&limit=${10}`, {
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
          data2: json.complaints
        })
        this.setState({
          data: json.complaints
        })
      }).catch(e => {
        console.log(e);
      })
    }


    const del=()=>{
      var temp=this.state.data

      for(var i=0;i<temp.length;i++)
      {
        if(temp[i]!=null&&temp[i]._id===this.state.CompId)
        {
          temp[i]=null
          break;
        }
      }

      this.setState({data:temp});
      this.setState({showModal:!this.state.showModal})
      console.log(this.state.data);

      fetch('/complaints/'+this.state.CompId,{
        method:'DELETE',
        headers:{
          "Content-Type":'application/json; charset=UTF-8',
        }
      }).then(res=>res.json()).then(json=>console.log(json)).catch(e=>console.log(e))

    }
    const filterStatus=()=>{
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
    const deleteComplaint=(id)=>{
      var x=document.getElementById('cont')
      if(x.style.overflow=="hidden")
      x.style.overflow="auto"
      else {
        x.style.overflow="hidden"
      }
      this.setState({modalContent:comp1(),showModal:!this.state.showModal,CompId:id})
    }
    const Active=(info)=>{
      return (
        <tr className="logs">
          <td><img src={Image(info.dept)}/></td>
            <td style={{width:'25%'}}>

            {`${info.issue.substring(0, 50)}...`}

          </td>
          <td>{info.date}</td>
          <td>  <div className="status active-log">{info.resolved?"Resolved":"Active"}</div></td>
          <td className="basic">
            <button style={{display:info.resolved?"none":"block"}} onClick={()=>deleteComplaint(info._id)}>Delete</button>
            <button id="done-but" onClick={()=>this.setState({modalContent:comp2(info._id),showModal:true})}>Resolve</button>
          </td>
        </tr>
      )
    }
    const resolved=(info)=>{
      return(
        <tr className="logs">
          <td><img src={Image(info.dept)}/></td>
            <td style={{width:'25%'}}>
            {`${info.issue.substring(0, 50)}...`}
          </td>
          <td>{info.date}</td>
          <td> <p className="status resolved-log">{info.resolved?"Resolved":"Active"}</p></td>
          <td className="basic">
            <button style={{display:info.resolved?"none":"block"}} onClick={()=>deleteComplaint(info._id)}>Delete</button>
            <button disabled id="done-but" >Resolve</button>
          </td>
        </tr>
      )
    }
    var obj=[];
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
        <div style={{height:'100vh'}}  className={this.state.showModal?"modal basic":"modal-hide "}>
          {this.state.modalContent}

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
        <div>
          <button id="prev" onClick={handlePageChange} style={{ margin: "20px",display:this.state.page_no===1?"none":"" , width:"150px", height:"50px", border: 'none', outline: 'none', cursor: 'pointer' }} className="button-yes">Prev</button>
          <button id="next" onClick={handlePageChange} style={{ margin: "20px", display: this.state.data.length < 10 ? "none" : "", marginLeft:"60em", width: "150px", height: "50px", border: 'none', outline: 'none', cursor: 'pointer' }}className="button-yes">Next</button>
        </div>

      </div>
    )
  }
}
