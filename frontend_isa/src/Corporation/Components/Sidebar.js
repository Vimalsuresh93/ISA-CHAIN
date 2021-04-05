import React from "react";
import { Link } from "react-router-dom";

const FireSidebar = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/corporation/register" className="nav-link">
          Register Certificate
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/corporation/getdetails" className="nav-link">
          Get Certiticate
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/corporation/updatedetails" className="nav-link">
          Renew Certificate
        </Link>
      </li>
    </ul>
  </nav>
);

export default FireSidebar;
