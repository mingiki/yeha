import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetToken: "[Auth setToken] Action",
  GetToken: "[Auth getToken] Action",
  SetLoginUser: "[Auth setloginuser] Action",
};

const initialAuthState = {
    accessToken: undefined,
    loginUser : undefined,
};

export const reducer = persistReducer(
    { storage, key: "root", whitelist: ["auth"] },
    (state = initialAuthState, action) => {
      switch (action.type) {
        case actionTypes.SetToken: {
          
          console.log(action.accessToken);

          // const { accessToken } = action.accessToken;
          return action.accessToken;
        }  

        case actionTypes.SetLoginUser: {
          
          console.log(action.loginUser);

          // const { accessToken } = action.accessToken;
          return action.loginUser;
        }  

        case actionTypes.GetToken: {
          return state.accessToken;
        }

        default:
          return state;
      }
    }
);

export const actions = {
  SetToken: accessToken => ({ type: actionTypes.SetToken, accessToken: { accessToken } }),
  GetToken: () => ({ type: actionTypes.GetToken }),
  SetLoginUser: loginUser => ({ type: actionTypes.SetToken, loginUser: { loginUser } }),
};
