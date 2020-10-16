

import React from "react";
import ReactDOM from "react-dom";

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import "../src/app/assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/app/assets/plugins/flaticon/flaticon.css";
import "../src/app/assets/plugins/flaticon2/flaticon.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";

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
  