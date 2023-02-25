import React from "react";
import { BrowserRouter as Router, HashRouter, Switch, Route, Link, Routes, useLocation } from 'react-router-dom';
import App from './App'
import Template from './Template'
import Filter from './Filter'

const RoutesLink = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  console.log(splitLocation)
  return (
  <HashRouter>
    <div className="topbar-main">
      <ul className="navn">
        <li>Advance Filter</li>
          <li className={splitLocation[1] === "" ? "active" : ""}><Link to={'/'} className="nav-link"> Home </Link></li>
          <li className={splitLocation[1] === "filter" ? "active" : ""}><Link to={'/filter'} className="nav-link">Filter</Link></li>
          <li className={splitLocation[1] === "template" ? "active" : ""}><Link to={'/template'} className="nav-link">Template</Link></li>
      </ul>
      <div className="logo-branding"><a href="">WP AdvanceFilter</a><span>Version 1.0</span></div>
    </div>
    <Routes>
      <Route  path="/" index element={<App />} />
      <Route path="/filter" element={<Filter />} />
      <Route path="/template" element={<Template />} />
    </Routes>
  </HashRouter>
  );
}
export default RoutesLink;