import React from 'react'
import Img from './download.png'
import Report1 from './Report1.svg'
import Arrow from './arrow.svg'
import { Bar,Pie } from 'react-chartjs-2';
import { renderToString } from "react-dom/server";
import "./Report.css"
import data from './Complaint_Data'
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas'

export default function Report(){
  // React.useEffect(()=>{
  //   const url='api/admin/complaints';
  //   const options={
  //     method:'POST',
  //     body:
  //   }
  //   fetch(url,options)
  //   .then(res=>res.json())
  //   .then(data=>console.log(data))
  // },[])
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
  const [month,setMonth]=React.useState("Month");
  const generate=()=>{
    document.getElementById("generate").classList.add("move-away-generate")
    document.getElementById("report-cont").classList.add("move-away-report-cont")
    var month=document.getElementById('month').value;

    setTimeout(()=>{setMonth(getMonth[month.slice(5,)]);setComp(comp2)},1000);
  }
  const comp1=(
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
  )
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
  for(var i=0;i<data.length;i++)
  {
    count[data[i].dept]++;
    if(data[i].resolved==true)
    countActive[data[i].dept]++;
    else
    countResolved[data[i].dept]++;
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
        data: [data.length]
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
  const comp3=(
    <div id="report-pdf" className="report-pdf">
      <div className="report-topper">Report<b>{month}</b></div>
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
  const comp2=(<div  className="report">
  <div className="report-topper">Report <b>{month}</b></div>
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
const [comp,setComp]=React.useState(comp1);
const printDocument=()=> {
  setComp(comp3);
  setTimeout(()=>{
    const input = document.getElementById('report-pdf');
    html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      var pdf = new jsPDF("p", "mm", "a4");
      const imgProps= pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("Report.pdf");
      setComp(comp2);
    })
  },1000)
}

return(
  <div className="basic" style={{position:'relative',height:'100vh'}}>
    <button className="down-pdf" onClick={printDocument}>
      <img src={Img} height="100px"/>
    </button>
    {comp}
  </div>
)
}
