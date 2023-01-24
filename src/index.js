import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import RoutesLink from "./RoutesLink";


document.addEventListener( 'DOMContentLoaded', function() {
    var element = document.getElementById( 'wpaf-admin-app' );
    if( typeof element !== 'undefined' && element !== null ) {
        ReactDOM.render( <RoutesLink />, document.getElementById( 'wpaf-admin-app' ) );
    }
} )