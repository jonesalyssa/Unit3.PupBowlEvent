import { configureStore } from "@reduxjs/toolkit";
import api from "./api"; // Correct import for api.js from the same folder
import puppyReducer from "../features/puppies/puppySlice";

// DONE: configure the store to use the API slice's auto-generated reducer and custom middleware.

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    puppies: puppyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
