import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import CounterSlice from "./slices/CounterSlice";
import GridSlice from "./slices/GridSlice";
import AuthSlice from "./slices/AuthSlice";

const rootReducer = combineReducers({
    counter : CounterSlice,
    grid: GridSlice,
    auth: AuthSlice
});

const persistConfig = {
    key: "root",
    storage: storageSession,
    whitelist: [
      "counter",
      "grid",
      "auth"
      
    ],
  };
  
  export const persistedReducer = persistReducer(persistConfig, rootReducer);