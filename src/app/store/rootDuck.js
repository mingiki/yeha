import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./modules/auth";

//setting
import * as group from "./modules/group";
import * as instructor from "./modules/instructor";
import * as settingClass from "./modules/class";

export const rootReducer = combineReducers({
  auth : auth.reducer,
  group : group.reducer,
  instructor : instructor.reducer,
  class : settingClass.reducer
});

