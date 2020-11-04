import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {rootReducer} from './rootDuck'

const persistConfig = {
  key: 'root',
  storage, 
  whitelist: ['auth','group','instructor', 'config', 'membership' , 'lesson']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer);

export const persistor = persistStore(store);
export default store;
