import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import artistSlice from "../slices/artistSlice";

const store = configureStore({
  reducer: {
    artists: artistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); 
export default store;
