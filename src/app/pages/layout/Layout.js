import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useLastLocation } from "react-router-last-location";

import Header from "./Header";
// import Footer from "./Footer";
import Routes from "../../router/Routes";

function Layout() {

   return (
    <>

      {/* <Header /> */}
        <Routes />
    </>
  );
} 


export default Layout;
