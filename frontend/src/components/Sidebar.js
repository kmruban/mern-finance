import React, { useState } from "react";
import "./sidebar.css";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top"></div>
      <div className="bottom">
        <a className="val" href="/account">
          <li className="sidebar-row" id={window.location.pathname === "/account" ? "active" : ""}>
            <div className="icon">
              <FontAwesomeIcon icon={faCircleUser} />
            </div>
            <div className="title">Account</div>
          </li>
        </a>
        <a className="val" href="/summary">
          <li className="sidebar-row" id={window.location.pathname === "/summary" ? "active" : ""}>
            <div className="icon">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div className="title">Summary</div>
          </li>
        </a>
        <a className="val" href="/transaction">
          <li className="sidebar-row" id={window.location.pathname === "/transaction" ? "active" : ""}>
            <div className="icon">
              <FontAwesomeIcon icon={faMoneyBillTransfer} />
            </div>
            <div className="title">Transaction</div>
          </li>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
