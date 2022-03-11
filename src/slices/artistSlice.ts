import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { WritableDraft } from "immer/dist/types/types-external";
import axios from 'axios';
import * as  data from "../../db.json";



interface TypeArtists {
  id: string | number;
  name: string;
  years_live: string;
  painting: string;
  created: string;
  image: string;
}

type SliceState = {
  arr_artists: TypeArtists[],
  theme: "light" | "dark",
  loading: boolean,
  isLogin: boolean,
  status: null | string,
  error: null | string,
};

const initialState : SliceState = {
  arr_artists: [],
  theme: "light",
  loading: false,
  isLogin: false,
  status: null,
  error: null,
};

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      // const arts = await axios.get(`http://localhost:3000/artists/static`, {
      //   method: 'GET',
      //   // mode: 'no-cors',
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Headers': '*',
      //     'Content-Type': 'application/json;charset=UTF-8',
      //   },
      //   withCredentials: true,
      //   // credentials: 'same-origin',
      // });
      // console.log(arts);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const setTheme = createAsyncThunk(
  "artists/setTheme",
  async ( theme: string, { rejectWithValue, dispatch }) => {
    try {
      console.log(theme);
      document.cookie = `theme=${theme}`;
      dispatch(setNewTheme(theme));
      return theme;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const setError = (state: any, action: any) => {
  state.status = "rejected";
  state.error = action.payload;
};

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    setNewTheme(state, action) {
      state.theme = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLogin(state, action){
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getArtists.fulfilled, (state, action) => {
      state.status = "resolved";
      state.arr_artists = action.payload.artists;
      state.loading = false;
    });
    builder.addCase(getArtists.rejected, setError);
  },
});

export const { setNewTheme, setLoading, setLogin } = artistSlice.actions;
export default artistSlice.reducer;
