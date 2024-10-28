// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="sidebar bg-primary text-white">
      <div className="brand text-center mb-4">
        <Link to="/" className="brand-name font-weight-bold text-white">
          Home
        </Link>
      </div>
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className="nav-link d-flex justify-content-between align-items-center"
              onClick={() => setIsCollapsed(!isCollapsed)}
              role="button"
              aria-expanded={isCollapsed}
              aria-controls="collapseExample"
            >
              <span className="d-flex align-items-center">
                <i className="mdi mdi-shape-outline"></i> Data Management
                <Icon path={mdiChevronDown} size={0.8} className="ml-2" />
              </span>
            </a>
            {isCollapsed && (
              <div className="collapse show" id="collapseExample">
                <Link to="/BookData" className="nav-link text-white">
                  <i className="mdi mdi-lead-pencil"></i> Book Data
                </Link>
                <Link to="/AuthorData" className="nav-link text-white">
                  <i className="mdi mdi-table"></i> Author Data
                  <button className="btn btn-dark btn-sm float-right">
                    <i className="mdi mdi-plus"></i>
                  </button>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="nav-bottom">
        <ul className="nav justify-content-center">
          {["profile", "messages", "notifications", "logout"].map(
            (item, index) => (
              <li className="nav-item" key={index}>
                <Link to={`/${item}`} className="nav-link text-white">
                  <i className={`mdi mdi-${item}`}></i>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
