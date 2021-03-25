import './App.css';
import React from 'react'
import {useRef} from 'react'
import {Link,BrowserRouter as Router} from 'react-router-dom';
import Back from './back.svg';
import HorizontalScroll from './HorizontalScroll'
var delta=1;
function App() {
    // const containerRef = useRef(null)
    // const onScrollDown=(e)=>{
    //   delta=delta*30
    //   containerRef.current.scrollLeft-=(delta);
    //   alert("hello");
    // }
  return (
    <div style={{overflow:'hidden'}}>
      <button onClick={()=>window.location.href="/login"} style={{fontFamily:'Righteous',fontSize:'140%',position:'absolute',right:'4%',top:'3.5%',background:'black',color:'white',outline:'none',border:'none',cursor:'pointer',padding:'4px 16px'}}>Login</button>
        <img src={Back} style={{height:'100vh'}}/>
          <style>
          @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
          </style>
    </div>
  );
}

export default App;

// <Link className="links" to="Student/history">Student</Link>
// <Link className="links" to="login">Login</Link>
// <div style={{overflow:'hidden',background:'red',backgroundImage: `url(${Back})`,backgroundSize:'cover',height:'100vh',width:'300vw'}}>
//
// </div>
