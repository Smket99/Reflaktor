import './App.css';
import React from 'react'
import {useRef} from 'react'
import {Link,BrowserRouter as Router} from 'react-router-dom';
import Back from './back.svg';
import HorizontalScroll from './HorizontalScroll'
var delta=1;
function App() {
    const containerRef = useRef(null)
    const onScrollDown=(e)=>{
      delta=delta*30
      containerRef.current.scrollLeft-=(delta);
      alert("hello");
    }
  return (
    <HorizontalScroll>
    <div  style={{height:'100vh',overflowY:'hidden'}}>
      
        <img src={Back} style={{height:'100vh'}}/>
      
    </div>
    </HorizontalScroll>
  );
}

export default App;

// <Link className="links" to="Student/history">Student</Link>
// <Link className="links" to="login">Login</Link>
// <div style={{overflow:'hidden',background:'red',backgroundImage: `url(${Back})`,backgroundSize:'cover',height:'100vh',width:'300vw'}}>
//
// </div>
