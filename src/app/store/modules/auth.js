import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetToken: "[Auth setToken] Action",
  GetToken: "[Auth getToken] Action",
  SetLoginUser: "[Auth setloginuser] Action",
  SetTokenResult: "[Auth SetTokenResult] Action",
};

const initialAuthState = {
    accessToken: undefined,
    loginUser : undefined,
    tokenResult: {
      resultCode : '999',
      resultMsg : 'null',
      resultData : null
    }
};

export const reducer = persistReducer(
    { key: "auth", storage, whitelist: [] },
    (state = initialAuthState, action) => {
      switch (action.type) {
        case actionTypes.SetToken: {
          return { ...state, accessToken : action.accessToken};
        }  

        case actionTypes.GetToken: {
          return state.accessToken;
        }
        
        case actionTypes.SetLoginUser: {
          return { ...state, loginUser : action.loginUser};
        }  

        case actionTypes.SetTokenResult: {
          return { ...state, tokenResult : action.tokenResult};
        }   

        default:
          return state;
      }
    }
);

export const actions = {
  SetToken: accessToken => ({ type: actionTypes.SetToken, accessToken}),
  GetToken: () => ({ type: actionTypes.GetToken }),
  SetLoginUser: loginUser => ({ type: actionTypes.SetLoginUser, loginUser }),
  SetTokenResult: tokenResult => ({ type: actionTypes.SetTokenResult, tokenResult }),
};
