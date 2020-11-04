import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetCategoryData: "[Lesson SetCategoryData] Action",
  SetSelectCategoryData: "[Lesson SetSelectCategoryData] Action",
  SetMainData: "[Lesson SetMainData] Action",
  SetSelectData: "[Lesson SetSelectData] Action",
};

const initialLessonState = {
    categoryData : null,
    selectCategoryData : null,
    mainData : null,
    selectData : null,
};

export const reducer = persistReducer(
    { key: "lesson", storage, whitelist: [] },
    (state = initialLessonState, action) => {
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
