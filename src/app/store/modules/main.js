import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  setIsJoin: "[Main setIsJoin] Action",
  setValid: "[Main setValid] Action",
  setUser: "[Main setUser] Action",
  setRoom: "[Main setRoom] Action",
  setCamerasSelected: "[Main setCamerasSelected] Action",
  setMicrophonesSelected: "[Main setMicrophonesSelected] Action",
  setValidResultCode: "[Main setValidResultCode] Action",
  setMainState: "[Main setMainState] Action",
};

export const actions = {
  setIsJoin: isJoin => ({ type: actionTypes.setIsJoin, isJoin }),
  setValid: valid => ({ type: actionTypes.setValid, valid }),
  setUser: user => ({ type: actionTypes.setUser, user }),
  setRoom: room => ({ type: actionTypes.setRoom, room }),
  setCamerasSelected: camerasSelected => ({ type: actionTypes.setCamerasSelected, camerasSelected }),
  setMicrophonesSelected: microphonesSelected => ({ type: actionTypes.setMicrophonesSelected, microphonesSelected }),
  setValidResultCode: validResultCode => ({ type: actionTypes.setValidResultCode, validResultCode }),
  setMainState: mainState => ({ type: actionTypes.setMainState, mainState }),
};

const initialMainState = {
  isRedirect: false,
  isJoin : false,
  valid : false,
  user : null,
  room : null,
  camerasSelected : null,
  microphonesSelected : null,
  isMirror : null,
  validResultCode : null
};

export const reducer = persistReducer(
    { storage, key: "eyeson-core", whitelist: ["main"] },
    (state = initialMainState, action) => {
      switch (action.type) {
        case actionTypes.setIsJoin: {
          return { 
            ...state,
            isJoin : action.isJoin
           };
        }  

        case actionTypes.setValid: {
          return { 
            ...state,
            valid : action.valid
           };
        } 

        case actionTypes.setUser: {
          return { 
            ...state,
            user : action.user
           };
        } 

        case actionTypes.setRoom: {
          return { 
            ...state,
            room : action.room
           };
        } 

        case actionTypes.setCamerasSelected: {
          return { 
            ...state,
            camerasSelected : action.camerasSelected
           };
        } 

        case actionTypes.setMicrophonesSelected: {
          return { 
            ...state,
            microphonesSelected : action.microphonesSelected
           };
        } 

        case actionTypes.setValidResultCode: {
          return { 
            ...state,
            validResultCode : action.validResultCode
           };
        } 

        case actionTypes.setMainState: {
          const { mainState } = action.mainState;
          console.log(action.mainState);
          
          return action.mainState;
        } 

        default:
          return state;
      }
    }
);

