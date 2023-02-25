import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import RoutesLink from "./RoutesLink";
import { HashRouter } from "react-router-dom";



document.addEventListener( 'DOMContentLoaded', function() {
    var element = document.getElementById( 'wpaf-admin-app' );
    if( typeof element !== 'undefined' && element !== null ) {
        ReactDOM.render(<HashRouter><RoutesLink /></HashRouter>, document.getElementById( 'wpaf-admin-app' ) );
    }
} )