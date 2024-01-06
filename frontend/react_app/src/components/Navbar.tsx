import React from "react";
import iconSvg from "../assets/icon.svg";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand link-light m-3" href="/">
          <img
            src={iconSvg}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          <span className="m-1">Budget Buddy</span>
        </a>
        {isLoggedIn && (
          <div>
            <a
              className="navbar-brand link-light link-opacity-75-hover"
              href="/"
            >
              Profile
            </a>
            <a
              className="navbar-brand link-light link-opacity-75-hover"
              href="/"
            >
              Profile
            </a>
            <button className="btn btn-outline-danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
