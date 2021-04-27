import React from 'react'
import './styles.css'
import './mob-styles.css'
import GoogleLogin from "react-google-login";
import history from '../../history'
const backside = "./sidepan.svg";
const overback = "./over-back1.svg";
// const history='../../history.js'

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isStudent: true,
      loginErr: ""
    };
  }
  render(){
    const responseGoogle = (response) => {
      // console.log(response.profileObj)
      const e =response.profileObj.email
      const addr = e.split('@').pop()
      if((addr==="hyderabad.bits-pilani.ac.in" && this.state.isStudent) || (addr==="gmail.com" && !this.state.isStudent)  )
      {
        document.querySelector(this.state.isStudent?".form":".form2").classList.add("move-away");
        document.querySelector(this.state.isStudent?".sidepanel":".sidepanel2").classList.add("move-away2");
        document.querySelector(".container").classList.add("move-away3");
        document.querySelector(".app").classList.add("move-away");
        var user=this.state.isStudent?"Student":document.getElementById('isStaff').checked?"Staff":"Admin"
        const userData={
          email: response.profileObj.email,
          imageUrl:response.profileObj.imageUrl,
          name:response.profileObj.givenName,
          isStaff:user==="Staff"?true:false
        }
        if(user!=="Student")
        {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
          };
          fetch('/Staff/' + userData.email, requestOptions)
          .then(response => response.json())
          .then(data => {
            this.setState({
              profileData: data
            })
            console.log(data);
          }).catch(error => {
            console.log(error)
          })
        }
        else{
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
          };
          fetch('/students/' + userData.email, requestOptions)
          .then(response => response.json())
          .then(data => {
            this.setState({
              profileData: data
            })
            console.log(data);
          }).catch(error => {
            console.log(error)
          })
        }
        this.props.setUserData(userData);
        window.localStorage.setItem(`curr${user}User`,JSON.stringify(userData))
        setTimeout(()=>window.location.href=`/${user}`,3000);
      }
      else {
        if(this.state.isStudent)
        alert("Not a BITS ID!")
        else {
          alert("BITS ID Not Allowed!")
        }
      }
    };
    const toggle = () => {
      this.setState({ isStudent: !this.state.isStudent });
      document.getElementById("toggle-tabs").style.opacity = "1";
    };
    return (
      <div className="app">
        <div className="container">
          <div className={this.state.isStudent ? "basic form" : "basic form2"}>
            <h1 style={{fontFamily:'Roboto Slab', marginBottom: "1em" }}>
              {this.state.isStudent ? "Student" : "Admin"}
            </h1>
            <GoogleLogin
              clientId="1011631254622-veeotam9apd3u9onh2aba8l4atdi5he5.apps.googleusercontent.com"
              buttonText="Sign In"
              onSuccess={responseGoogle}
              onFailure={()=>console.log("Error")}
              cookiePolicy={"single_host_origin"}
              />
            <div style={{width:'20%',margin:'1em',display:this.state.isStudent?"none":"flex", justifyContent:'space-around',alignItems:'center'}}>
              <input id="isStaff"  type="checkbox" />
              <label htmlFor="isStaff"> Hostel Staff</label>
            </div>
          </div>

          <div className={this.state.isStudent?"sidepanel basic":"sidepanel2 basic"}>
            <button id="toggle-tabs" onClick={toggle}>
              {this.state.isStudent ? "Admin" : "Student"}
            </button>
          </div>
        </div>
        <div className="container-mob">
          <div
            className={this.state.isStudent ? "basic form-mob" : "basic form-mob2"}>
            <h1 style={{fontFamily:'Roboto Slab', marginBottom: "1em" }}>
              {this.state.isStudent ? "Student" : "Admin"}
            </h1>
            <GoogleLogin
              clientId="1011631254622-veeotam9apd3u9onh2aba8l4atdi5he5.apps.googleusercontent.com"
              buttonText="Sign In"
              onSuccess={responseGoogle}
              onFailure={()=>console.log("Error")}
              cookiePolicy={"single_host_origin"}
              />
          </div>
          <div
            className={this.state.isStudent? "basic sidepanel-mob": "basic sidepanel-mob2"}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            >
            <button id="toggle-tabs" onClick={toggle}>
              {this.state.isStudent ? "Admin" : "Student"}
            </button>
          </div>
        </div>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap');
        </style>
      </div>
    )
  }
}
