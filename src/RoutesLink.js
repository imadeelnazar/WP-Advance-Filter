import React from "react";
import { BrowserRouter as Router, HashRouter, Switch, Route, Link, Routes } from 'react-router-dom';
import App from './App'
import Template from './Template'

const RoutesLink = () => {
  return (
  <HashRouter>
    <div className="topbar-main">
      <ul className="navn">
        <li>Advance Filter</li>
        <li><Link to={'/'} className="nav-link"> Home </Link></li>
        <li><Link to={'/template'} className="nav-link">Template</Link></li>
      </ul>
      <div className="logo-branding"><a href="">WP AdvanceFilter</a><span>Version 1.0</span></div>
    </div>
    <Routes>
      <Route path="/" index element={<App />} />
      <Route path="/template" element={<Template />} />
    </Routes>
  </HashRouter>
  );
}
export default RoutesLink;