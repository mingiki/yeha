import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as session from "./modules/session";
import * as auth from "./modules/auth";
import * as video from "./modules/video";
import * as main from "./modules/main";
import * as config from "./modules/config";

export const rootReducer = combineReducers({
  session : session.reducer,
  auth : auth.reducer,
  video : video.reducer,
  main : main.reducer,
  config : config.reducer
});

