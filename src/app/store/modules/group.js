import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetMainData: "[Group SetMainData] Action",
  SetSelectData: "[Group SetSelectData] Action",
};

const initialGroupState = {
    mainData : null,
    selectData : null,
};

export const reducer = persistReducer(
    { key: "group", storage, whitelist: ["group"] },
    (state = initialGroupState, action) => {
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
