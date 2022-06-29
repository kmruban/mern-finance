import React, { useState } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import Dropdown from './Dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Topbar() {
  const [dropdown, setDropdown] = useState(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <div className="topbar">
      <div className="left">
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="right">
        <ul className="ul">
          <li className="n1">
            <Link to="/login" className="log">
              Login
            </Link>
          </li>
          <li className="n1">
            <Link to="/register" className="log">
              Register
            </Link>
          </li>
          <li
            className="n2"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <FontAwesomeIcon icon={faUser} />
            <p>Kyle Ruban</p>
            
            {dropdown && <Dropdown />}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Topbar;