import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/App.css";
import RoutesLink from "./routes/FilterRoutesLink";
import { HashRouter } from "react-router-dom";


document.addEventListener( 'DOMContentLoaded', function() {
    var element = document.getElementById( 'wpaf-admin-app' );
    if( typeof element !== 'undefined' && element !== null ) {
        ReactDOM.render(<HashRouter><RoutesLink /></HashRouter>, document.getElementById( 'wpaf-admin-app' ) );
    }
} )