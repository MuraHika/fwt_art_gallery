import { configureStore } from "@reduxjs/toolkit";
import artistSlice from "../slices/artistSlice";

export const store = configureStore({
  reducer: {
    artists: artistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
