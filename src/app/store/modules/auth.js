import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetToken: "[Auth setToken] Action",
  GetToken: "[Auth getToken] Action",
};

const initialAuthState = {
    userToken: undefined
};

export const reducer = persistReducer(
    { storage, key: "eyeson-core", whitelist: ["auth"] },
    (state = initialAuthState, action) => {
      switch (action.type) {
        case actionTypes.SetToken: {
          const { userToken } = action.userToken;
          return { userToken };
        }  

        case actionTypes.GetToken: {
          console.log("리듀서 값 가져오기");
          console.log(state);

          return state.userToken;
        }

        default:
          return state;
      }
    }
);

export const actions = {
  SetToken: userToken => ({ type: actionTypes.SetToken, userToken: { userToken } }),
  GetToken: () => ({ type: actionTypes.GetToken })
};
