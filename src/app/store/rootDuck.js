import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./modules/auth";


export const rootReducer = combineReducers({
  auth : auth.reducer
});

