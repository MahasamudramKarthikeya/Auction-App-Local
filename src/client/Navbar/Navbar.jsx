// Import necessary modules and components
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './navbarstyle.scss';
import { UserContext } from '../../App';

// Import your custom logo file
import CustomLogo from '../images/logo.svg';

const Navbar = () => {
  // Access user context
  const { state } = useContext(UserContext);

  // Render menu based on user authentication state
  const RenderMenu = () => {
    if (state) {
      return (
        // JSX for authenticated user menu items
        <>
          
          <li className="dropdown nav-item px-3 mx-auto licls">
            <NavLink to="#" className="nav-link">
              <span id="headrdr">Lots</span>
            </NavLink>
            <ul className="ddlist">
              <li>
                <NavLink to="/addlot" className="nav-link">
                  Add Lot
                </NavLink>
              </li>
              <li>
                <NavLink to="/updatelot" className="nav-link">
                  My Lots
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item px-3 mx-auto licls">
            <NavLink activeClassName="active" className="nav-link" to="/lot">
              Bid & Buy
            </NavLink>
          </li>
          <li className="nav-item px-3 mx-auto licls">
            <NavLink activeClassName="active" className="nav-link" to="/bidstatus">
              Bid Status
            </NavLink>
          </li>
          <li className="dropdown nav-item px-3 mx-auto licls">
            <NavLink to="#" className="nav-link">
              <span id="headrdr">My Profile</span>
            </NavLink>
            <ul className="ddlist">
              <li>
                <NavLink to="/profile" className="nav-link">
                  User Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </>
      );
    } else {
      return (
        // JSX for non-authenticated user menu items
        <>
          
          <li className="nav-item px-5 mx-auto">
            <div className="signupbtn">
              <NavLink to="/signup" className="btn-get-started" id="bt1">
                Sign Up
              </NavLink>
            </div>
          </li>
        </>
      );
    }
  };

  return (
    // JSX for the entire Navbar component
    <div className="container-fluid nav_bg navbarpg">
      <div className="row">
        <div className="col-10 mx-auto">
          {/* Navbar component */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              {/* Replace the existing logo with your custom logo */}
               <NavLink className="navbar-logo" to="/">
                <img src={CustomLogo} alt="BestBid Logo" className="custom-logo" />
              </NavLink>
              {/* Toggle button for responsive design */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {/* Collapsible navbar content */}
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* Navbar items */}
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {/* Render dynamic menu based on authentication state */}
                  <RenderMenu />
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;