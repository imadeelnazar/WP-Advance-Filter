import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import RoutesLink from "./RoutesLink";


document.addEventListener( 'DOMContentLoaded', function() {
    var element = document.getElementById( 'wprk-admin-app' );
    if( typeof element !== 'undefined' && element !== null ) {
        ReactDOM.render( <RoutesLink />, document.getElementById( 'wprk-admin-app' ) );
    }
} )