import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetMainData: "[Config SetMainData] Action",
  SetSelectData: "[Config SetSelectData] Action",
};

const initialConfigState = {
    mainData : null,
    selectData : null,
};

export const reducer = persistReducer(
    { key: "config", storage, whitelist: [] },
    (state = initialConfigState, action) => {
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
