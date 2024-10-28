// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiChevronDown } from "@mdi/js";
import { DataContext } from "./DataContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function Dashboard() {
  const { books, authors } = useContext(DataContext); // Access books and authors from context
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="container-fluid">
      {/* Sidebar */}
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
      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <h2 className="text-header font-weight-bold mb-4">
            TSK LIBRARY SYSTEM
          </h2>
          {/* Statistic Cards Row */}
          <div className="row justify-content-center">
            <div className="col-md-6 mb-4 d-flex justify-content-center">
              <div className="card user-card">
                <div className="card-body">
                  <h3 className="value-widget font-weight-bold">
                    {books.length}
                  </h3>
                  <label className="title-widget">Book Data</label>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4 d-flex justify-content-center">
              <div className="card author-card">
                <div className="card-body">
                  <h3 className="value-widget font-weight-bold">
                    {authors.length}
                  </h3>
                  <label className="title-widget">Author Data</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
