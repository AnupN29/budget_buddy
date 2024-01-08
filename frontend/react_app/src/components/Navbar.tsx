import React from "react";
import iconSvg from "../assets/icon.svg";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
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
          <div className="navbar-nav ml-auto">
            <a
              className="navbar-brand link-light link-opacity-75-hover"
              href="/"
            >
              Plan Budget
            </a>
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle link-light link-opacity-75-hover"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Transactions
              </a>
              <ul
                className="dropdown-menu bg-dark"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a
                    className="dropdown-item link-light link-opacity-75-hover bg-dark"
                    href="/transactions"
                  >
                    View History
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item link-light link-opacity-75-hover bg-dark"
                    href="/add-transaction"
                  >
                    Add New
                  </a>
                </li>
              </ul>
            </div>
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
