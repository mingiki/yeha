import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { Provider , connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/configureStore";

import { LastLocationProvider } from "react-router-last-location";
import { IntlProvider , addLocaleData } from "react-intl";
import { Helmet } from "react-helmet";
import Routes from "./router/Routes"

import en from "./config/lang/en.json";
import ko from "./config/lang/ko.json";

import UtilService from "./service/UtilService";

import Layout from './pages/layout/Layout';

//다국어 처리
const message = {'en' : en , 'ko' : ko}
const language = localStorage.getItem("language") ? localStorage.getItem("language") : new UtilService().getUserLocal();

//로그를 막아줍니다. (실서버는 숨겨줍니다.)
var logger = function() {
  var oldConsoleLog = null;
  var pub = {};
  pub.enableLogger = function enableLogger() {
      if (oldConsoleLog == null)
          return;
      window['console']['log'] = oldConsoleLog;
  };
  pub.disableLogger = function disableLogger() {
      oldConsoleLog = console.log;
      window['console']['log'] = function() {};
  };
  return pub;
}();

let mode = process.env.REACT_APP_MODE;
// if (mode == "prod") {
//   logger.disableLogger();
// } else {
//   logger.enableLogger();
// }

class App extends React.Component {
 
  render() {
    return <>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
              <React.Suspense>
                <BrowserRouter basename={this.props.basename}>
                  <LastLocationProvider>
                    <IntlProvider locale={language} messages={message[language]}>                      
                      {/* <Switch> */}
                        <Routes/>
                      {/* </Switch>     */}
                  </IntlProvider>
                </LastLocationProvider>
              </BrowserRouter>
            </React.Suspense>
          </PersistGate>
        </Provider>          
        </>
     
  }
}

export default App;