import { configureStore } from "@reduxjs/toolkit";
import artistSlice from "../slices/artistSlice";
import userSlice from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    artists: artistSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
