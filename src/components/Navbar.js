import React from "react";

const Navbar = () => (
  <nav 
    className="main-header navbar navbar-expand navbar-light " 
    style={{ 
      marginLeft: "280px",
      marginTop: "18px",
      marginRight: "18px",
      borderRadius: "18px", 
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
      backgroundColor: "white"
    }}
  >
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
          <i className="fas fa-bars"></i>
        </a>
      </li>
    </ul>
  </nav>
);

export default Navbar;
