import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetCategoryData: "[Membership SetCategoryData] Action",
  SetSelectCategoryData: "[Membership SetSelectCategoryData] Action",
  SetMainData: "[Membership SetMainData] Action",
  SetSelectData: "[Membership SetSelectData] Action",
};

const initialMembershipState = {
    categoryData : null,
    selectCategoryData : null,
    mainData : null,
    selectData : null,
};

export const reducer = persistReducer(
    { key: "membership", storage, whitelist: [] },
    (state = initialMembershipState, action) => {
      switch (action.type) {
        case actionTypes.SetCategoryData: {
          return { ...state, categoryData : action.categoryData};
        }  

        case actionTypes.SetSelectCategoryData: {
          return { ...state, selectCategoryData : action.selectCategoryData};
        }   
        
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
  SetCategoryData: categoryData => ({ type: actionTypes.SetCategoryData, categoryData}),
  SetSelectCategoryData : selectCategoryData =>  ({ type: actionTypes.SetSelectCategoryData, selectCategoryData}),
  SetMainData: mainData => ({ type: actionTypes.SetMainData, mainData}),
  SetSelectData: selectData => ({ type: actionTypes.SetSelectData, selectData }),
};
