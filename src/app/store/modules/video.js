import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  setUser: "[Video setUser] Action",
  setRoom: "[Video getRoom] Action",
};

const initialVideoState = {
    user: undefined,
    room: undefined
};

export const reducer = persistReducer(
    { storage, key: "eyeson-core", whitelist: ["video"] },
    (state = initialVideoState, action) => {
      switch (action.type) {
        case actionTypes.setUser: {
          const { user } = action.user;
          return { user };
        }  
        case actionTypes.setRoom: {
            const { room } = action.room;
            return { room };
          }  
        default:
          return state;
      }
    }
);

export const actions = {
    setUser: user => ({ type: actionTypes.setUser, user: { user } }),
    setRoom: room => ({ type: actionTypes.setRoom, room: { room } }),
};
