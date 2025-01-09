import { configureStore } from "@reduxjs/toolkit";
import api from "./api";
import puppyReducer from "../features/puppies/puppySlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    puppies: puppyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
