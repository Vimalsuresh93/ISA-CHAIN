import React from "react";
import { Link } from "react-router-dom";

const FireSidebar = () => (
  <div style={{backgroundColor:"#221f3b"}}>
 <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/electricity/register" className="nav-link text-white">
          Register Certificate
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/electricity/getdetails" className="nav-link text-white">
          Get Certiticate
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/electricity/updatedetails" className="nav-link text-white">
          Renew Certificate
        </Link>
      </li>
    </ul>
  </nav>


  </div>
 
);

export default FireSidebar;
