import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./modules/auth";

//setting
import * as group from "./modules/group";

export const rootReducer = combineReducers({
  auth : auth.reducer,
  group : group.reducer
});

