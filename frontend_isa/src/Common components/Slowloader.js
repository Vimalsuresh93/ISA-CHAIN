import React, { Component } from "react";
import Gif from "./giphy.gif"
class slowLoader extends Component {
  state = {};
  render() {
    return (
      <div style={{ backgroundColor: '#221f3b',height:"1000px"}}>
      <div className="text-center " style={{position:"relative",top:"300px"}}>
        <img src={Gif} width="200rem"/>
        <h1 className="text-white">Please Wait.. This may take some time.I'm Talking With Blockchain </h1>
    <div class="spinner-grow text-danger" style={{width: "3rem", height: "3rem"}} role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-info" style={{width: "3rem", height: "3rem"}} role="status">
      <span class="sr-only">Loading...</span>
    </div>
    </div>
    </div>
    );
  }
}
export default slowLoader;