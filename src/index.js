

import React from "react";
import ReactDOM from "react-dom";


// import "./app/assets/plugin/flaticon2/flaticon.css";

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import './index.scss';

import App from './app/App';
// import * as serviceWorker from './serviceWorker';

const { PUBLIC_URL } = process.env;

ReactDOM.render(
    <App
      basename={PUBLIC_URL}
    />,
    document.getElementById("root")
  );
  