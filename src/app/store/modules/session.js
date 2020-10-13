import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetSession: "[Open Vidu setSession] Action",
  GetSession: "[Open vidu getSession] Action",
};

const initialSessionState = {
    ovSession: undefined
};

export const reducer = persistReducer(
    { storage, key: "ovSession", whitelist: ["ovSession"] },
    (state = initialSessionState, action) => {
      switch (action.type) {
        case actionTypes.SetSession: {

          console.log("리듀서 값 세팅하기");
          console.log(action.ovSession);
          const { ovSession } = action.ovSession;
          console.log(ovSession);
          return { ovSession };
        }  

        case actionTypes.GetSession: {
          console.log("리듀서 값 가져오기");
          console.log(state);

          return state;
        }

        default:
          return state;
      }
    }
);

export const actions = {
    SetSession: ovSession => ({ type: actionTypes.SetSession, ovSession: { ovSession } }),
    GetSession: () => ({ type: actionTypes.GetSession })
};
