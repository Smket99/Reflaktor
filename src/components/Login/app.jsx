import React from 'react'
import './styles.css'
import './mob-styles.css'
import GoogleLogin from "react-google-login";
const backside = "./sidepan.svg";
const overback = "./over-back1.svg";
const responseGoogle = (response) => {
  alert(response.profileObj.givenName)
  document.querySelector(".form").classList.add("move-away");
  document.querySelector(".sidepanel").classList.add("move-away2");
  document.querySelector(".container").classList.add("move-away3");
  document.querySelector(".app").classList.add("move-away");
    setTimeout(()=>window.location.href="/student",3000);

};
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isStudent: true,
      loginErr: "",
    };
  }
  render(){
    const toggle = () => {
      this.setState({ isStudent: !this.state.isStudent });
      document.getElementById("toggle-tabs").style.opacity = "1";
    };
    return (
      <div className="app">
        <div className="container">
          <div className={this.state.isStudent ? "basic form" : "basic form2"}>
            <h1 style={{ marginBottom: "1em" }}>
              {this.state.isStudent ? "Student" : "Admin"}
            </h1>
            <GoogleLogin
              clientId="1011631254622-veeotam9apd3u9onh2aba8l4atdi5he5.apps.googleusercontent.com"
              buttonText={this.state.isStudent ? "Sign In" : "Sign In"}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              />
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
            <h1 style={{ marginBottom: "1em" }}>
              {this.state.isStudent ? "Student" : "Admin"}
            </h1>
            <GoogleLogin
              clientId="1011631254622-veeotam9apd3u9onh2aba8l4atdi5he5.apps.googleusercontent.com"
              buttonText={this.state.isStudent ? "Sign In" : "Sign In"}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
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
      </div>
    )
  }
}
