import React from "react";
import "./profile.css";
// let profData = JSON.parse(localStorage.getItem("currUser"));
let profData={
  name:"Smiket Barodia"
}
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      isOpen: true
    };
  }
  render() {
    // localStorage.setItem("currUser", JSON.stringify(profData));
    const handleChange = (e) => {
      this.setState({ msg: e.target.value });
    };

    return (
      <div
        className="basic"
        style={{
          color: "black",
          width: "100%",
          height: "100vh",
          background: "white",
          position: "relative"
        }}
      >
        <h1 style={{ fontFamily: "Nunito" }}>{profData.name}</h1>
        <img
          src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png"
          height="20%"
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            display: "flex"
          }}
        >
          <div
            className="prof-card"
            style={{
              background: "linear-gradient(to right, #23d5da, #5388e7)"
            }}
          >
            {this.state.msg}
          </div>
          <div
            className="prof-card"
            style={{
              background: "linear-gradient(to right, #f6539a, #fd6f7c)"
            }}
          ></div>
          <div
            className="prof-card"
            style={{
              background: "linear-gradient(to right, #40dc9a, #3cbbb1)"
            }}
          ></div>
          <div
            className="prof-card"
            style={{
              background: "linear-gradient(to right, #ffcc43, #ff9054)"
            }}
          ></div>
        </div>
        <input type="text" onChange={handleChange} />
      </div>
    );
  }
}
