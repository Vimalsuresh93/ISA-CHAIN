import React from "react";
import {Link,withRouter} from "react-router-dom"
const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            ISA Chain
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/">
                <a class="nav-link active" aria-current="page" >
                  Home
                </a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/fire"><a class="nav-link active" aria-current="page">
                  Fire Department
                </a></Link>
              </li>
              <li class="nav-item">
                <Link to="/electricity">
                <a class="nav-link active" aria-current="page" >
                  Electricity Department
                </a>
                </Link>
                </li>
              <li class="nav-item">
                <Link to="/corporation">
                <a class="nav-link active" aria-current="page">
                  Corporation
                </a>
                </Link>
                  </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
