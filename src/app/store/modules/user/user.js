import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetMainData: "[User SetMainData] Action",
  SetSelectData: "[User SetSelectData] Action",
};

const initialUserState = {
    mainData : null,
    selectData : null,
};

export const reducer = persistReducer(
    { key: "user", storage, whitelist: [] },
    (state = initialUserState, action) => {
      switch (action.type) {
        case actionTypes.SetMainData: {
          return { ...state, mainData : action.mainData};
        }  

        case actionTypes.SetSelectData: {
          return { ...state, selectData : action.selectData};
        }   

        default:
          return state;
      }
    }
);

export const actions = {
  SetMainData: mainData => ({ type: actionTypes.SetMainData, mainData}),
  SetSelectData: selectData => ({ type: actionTypes.SetSelectData, selectData }),
};
