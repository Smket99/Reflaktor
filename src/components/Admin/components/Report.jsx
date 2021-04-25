import React from 'react'
import Img from './download.png'
import Report1 from './Report1.svg'
import Arrow from './arrow.svg'
import { Bar,Pie } from 'react-chartjs-2';
import { renderToString } from "react-dom/server";
import "./Report.css"
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas'

export default class Report extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      month:"",
      component:<div></div>,
      data:[],
      component2:<div></div>

  }
}
componentDidUpdate(nextProps, nextState){
  if(this.state.data.length!==nextState.data.length)
  {
    var count={
      IT:0,
      Carpenter:0,
      Electrician:0,
      Plumber:0,
      Admin:0
    };
    var countActive={
      IT:0,
      Carpenter:0,
      Electrician:0,
      Plumber:0,
      Admin:0
    }
    var countResolved={
      IT:0,
      Carpenter:0,
      Electrician:0,
      Plumber:0,
      Admin:0
    }
    for(var i=0;i<this.state.data.length;i++)
    {
      count[this.state.data[i].dept]++;
      if(this.state.data[i].resolved==true)
      countActive[this.state.data[i].dept]++;
      else
      countResolved[this.state.data[i].dept]++;
    }

    const options={
      scales: {
        yAxes: [{
          ticks: {
            min:0,
            stepSize:1
          }
        }]
      },
      title:{
        display:true,
        text:'Overview',
        fontSize:20
      },
      legend:{
        display:true,
        position:'right'
      }
    }
    const options2={
      scales: {
        yAxes: [{
          ticks: {
            min:0,
            stepSize:1
          }
        }]
      },
      title:{
        display:true,
        text:'Department-Wise',
        fontSize:20
      },
      legend:{
        display:true,
        position:'right'
      }
    }
    const overall = {
      labels: ['Complaints'],
      datasets: [
        {
          label: 'Reported',
          backgroundColor: 'indianred',
          borderColor: 'none',
          borderWidth: 0,
          data: [this.state.data.length]
        },
        {
          label: 'Active',
          backgroundColor: 'dodgerblue',
          borderColor: 'none',
          borderWidth: 0,
          data: [countActive['IT']+countActive['Admin']+countActive['Carpenter']+countActive['Electrician']+countActive['Plumber']]
        },
        {
          label: 'Resolved',
          backgroundColor: 'mediumaquamarine',
          borderColor: 'none',
          borderWidth: 0,
          data: [countResolved['IT']+countResolved['Admin']+countResolved['Carpenter']+countResolved['Electrician']+countResolved['Plumber']]
        },
      ]
    }
    const state = {
      labels: ['IT','Admin','Carpenter','Electrician','Plumber'],
      datasets: [
        {
          label: 'Reported',
          backgroundColor: 'indianred',
          borderColor: 'none',
          borderWidth: 0,
          data: [count['IT'],count['Admin'],count['Carpenter'],count['Electrician'],count['Plumber']]
        },
        {
          label: 'Active',
          backgroundColor: 'dodgerblue',
          borderColor: 'none',
          borderWidth: 0,
          data: [countActive['IT'],countActive['Admin'],countActive['Carpenter'],countActive['Electrician'],countActive['Plumber']]
        },
        {
          label: 'Resolved',
          backgroundColor: 'mediumaquamarine',
          borderColor: 'none',
          borderWidth: 0,
          data: [countResolved['IT'],countResolved['Admin'],countResolved['Carpenter'],countResolved['Electrician'],countResolved['Plumber']]
        },
      ]
    }
    console.log(this.state.data);
    const comp2=(
      <div  className="report">
        <div className="report-topper">Report</div>
        <div  className="report-content">
          <div className="complaint over-all">
            <Bar
              data={overall}
              options={options}
              />
          </div>
          <div className="complaint IT-complaints">
            <Bar
              data={state}
              options={options2}
              />
          </div>
        </div>
      </div>
    )
    this.setState({component2:comp2})
  }
}
render(){
  const getMonth={
    "01":"January",
    "02":"February",
    "03":"March",
    "04":"April",
    "05":"May",
    "06":"June",
    "07":"July",
    "08":"August",
    "09":"September",
    "10":"October",
    "11":"November",
    "12":"December"
  }

  const generate=()=>{
    var data=[]
    document.getElementById("generate").classList.add("move-away-generate")
    document.getElementById("report-cont").classList.add("move-away-report-cont")
    var month=document.getElementById('month').value;
    const op={
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({month:month.slice(5,)})
    }
    fetch('/getfilteredcomplaint',op)
    .then(res=>res.json())
    .then((data)=>this.setState({data:data.data},()=>console.log(this.state.data)))
    setTimeout(()=>{
      this.setState({
        month:getMonth[month.slice(5,)],

      })}
      ,1000);
    }
    return(
      <div className="basic" style={{position:'relative',height:'100vh'}}>
        <div id="report-cont" className="report-container basic">
          <img src={Report1} style={{height:'200px'}}/>
          <div style={{display:'flex',justifyContent:'space-between',width:'50%',alignItems:'center'}}>
            <label htmlFor="to-date">Choose Month:</label>
            <input id="month" type="month"/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',width:'50%',alignItems:'center'}}>
            <label htmlFor="to-date">Choose Date:</label>
            <input id="date" type="date"/>
          </div>
          <div className="wrap">
            <button id="generate" onClick={generate} className="generate">Generate<img className="arrow" style={{height:'20px'}} src={Arrow}/></button>
          </div>
        </div>
        {this.state.component}
        {this.state.component2}
      </div>
    )
  }
}
