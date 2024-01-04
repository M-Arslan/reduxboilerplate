import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import { persistedReducer } from "./RootReducer";

export const store = configureStore({
  reducer: persistedReducer,
});
export const storeWithLogger = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }).concat(logger, thunk),
});
export const storeWithOutLogger = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({ 
      serializableCheck: false,
    }).concat(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
