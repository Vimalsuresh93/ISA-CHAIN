import React from 'react';
import { Link, withRouter } from "react-router-dom";
import ParticlesBg from "particles-bg";
import "./Homejs";
import "./Homecss.css"
const Home = () => {
    return ( 
        <div className="typewriter">
        <h1>
          <Link
            style={{
              color: "#221f3b",
            }}
            class="typewrite"
            data-period="2000"
            data-type='[ "Hi, Im ISA.", "Im a Decentralized Infrastructure Safety Assurance DAPP <br> For Public." ]'
          >
            <span class="wrap"></span>
          </Link>
          <ParticlesBg type="square"color="#221f3b" bg={true}  />   
        </h1>
        </div>
     );
}
 
export default Home;