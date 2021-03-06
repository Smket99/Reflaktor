import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Report from "./components/Report";
import Complaint from "./History/history";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import LogImg from "./components/Logout.svg";
import ProfImg from "./components/Report.svg";
import CompImg from "./components/Complaint.svg";
import Logo from './components/Logo.svg';
import Logo1 from './components/Logo1.svg';
import history from '../../history'
const ham = "./components/Hamburger.svg";
const comps = [Report,Complaint,Notification,Logout];
const back = ".components/over-back.svg";
var menuItems = ["Report", "Complaint","Notify","Logout"];
var menuItems1 = ["Report", "Complaint","Notify","Logout"];
export default function App() {
  React.useEffect(()=>{
    if(localStorage.getItem("currAdminUser")===null)
    {
      alert("Access Restricted !")
      window.location.href="/login"
    }
  },[])
  const {state}=history.location
  console.log(state);
  const [exp, setExp] = React.useState(false);
  const closeDrawer = () => {
    if (exp) {
      setExp(false);
      document.getElementById("mob-menu").classList.remove("expand");
    }
  };
  const toggleMen = () => {
    if (!exp) {
      setExp(true);
      document.getElementById("nav-options").style.display = "flex";
      document.getElementById("mob-menu").classList.add("expand");
      document.getElementById("nav-options").style.display = "flex";
    } else {
      setExp(false);
      document.getElementById("mob-menu").classList.remove("expand");
    }
  };
  document.title = "Dashboard";
  const Imgae=(x)=>{
    if(x==="Report")
    return ProfImg;
    else if(x==="Logout")
    return LogImg;
    else
    return CompImg;
  }
  const Menu = menuItems1.map((item) => (
    <NavLink
      to={"/admin/" + item}
      onClick={closeDrawer}
      className="dash-menu-item"
      style={{
        display: "flex",
        alignItems: "center",
        position:'relative',
        overflow:'hidden'
      }}
      >
      <img
        id="adornment"
        style={{marginLeft: "0.5em" }}
        src={Imgae(item)}
        />
      <b id="nav-options" style={{ marginLeft: "1em" }}>
        {item}
      </b>
      <div style={{width:'2%',background:'white',height:'100%',position:'absolute',left:'0'}} />
    </NavLink>
  ));
  var elements = document.querySelectorAll(".dash-menu-item");
  var myFunction = function () {
    [].forEach.call(elements, function (el) {
      el.classList.remove("active");
    });
    this.classList.add("active");
  };

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", myFunction);
  }
  const routes = [];
  for (var i = 0; i < menuItems.length; i++) {
    routes.push({
      path: "/admin/" + menuItems[i],
      name: menuItems[i],
      Component: comps[i]
    });
  }
  return (

    <Router>
      <div className="dash-cont">
        <div className="basic dash-menu">
          <img src={Logo1} width="90%" style={{position:'absolute',top:'1%',left:'2%'}}/>{Menu}</div>
          <div id="mob-menu" className="basic dash-menu-mob">
            <img src={Logo} width="90%" style={{position:'',top:'10%',left:'2%'}}/>

            <div
              style={{ display: exp ? "none" : "block" }}
              onClick={toggleMen}
              className="hamburger"
              >
              <div
                style={{
                  width: "50%",
                  margin: "0.1em",
                  borderRadius: "10px",
                  height: "0.2em",
                  background: "white"
                }}
                />
              <div
                id="ln-1"
                style={{
                  borderRadius: "10px",
                  margin: "0.1em",
                  height: "0.2em",
                  background: "white"
                }}
                />
              <div
                id="ln-2"
                style={{
                  borderRadius: "10px",
                  margin: "0.1em",
                  height: "0.2em",
                  background: "white"
                }}
                />
            </div>
            <div
              style={{ display:"flex"}}
              className="basic close-cross"
              onClick={toggleMen}
              >
              <div
                style={{
                  width: "20px",
                  margin: "0.1em",
                  height: "0.2em",
                  background: "white",
                  borderRadius: "20px",
                  transform: "rotate(45deg)",
                  position: "absolute"
                }}
                />
              <div
                style={{
                  borderRadius: "20px",
                  width: "20px",
                  margin: "0.1em",
                  height: "0.2em",
                  background: "white",
                  transform: "rotate(-45deg)",
                  position: "absolute"
                }}
                />
            </div>
            {Menu}
          </div>

          <div onFocus={closeDrawer} className="crumbs">
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={500}
                    classNames="page"
                    unmountOnExit
                    >
                    <div className="page">
                      <Component userData={state}/>
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
          </div>
        </div>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Potta+One&display=swap');
        </style>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap');
        </style>
      </Router>
    );
  }
