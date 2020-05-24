import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="navbar-nav ml-auto py-4 py-md-0">
        <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
          <NavLink
            className="nav-link "
            to="/login"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Login
          </NavLink>
          <div className="dropdown-menu"></div>
        </li>

        <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
          <NavLink className="nav-link" to="/signup">
            SignUp
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
