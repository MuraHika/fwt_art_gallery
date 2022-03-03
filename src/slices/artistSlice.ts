import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { WritableDraft } from "immer/dist/types/types-external";
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
  status: null | string,
  error: null | string,
};

const initialState : SliceState = {
  arr_artists: [],
  theme: "light",
  status: null,
  error: null,
};

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async (_, { rejectWithValue }) => {
    try {
      console.log(data);
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
  },
  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getArtists.fulfilled, (state, action) => {
      state.status = "resolved";
      state.arr_artists = action.payload.artists;
    });
    builder.addCase(getArtists.rejected, setError);
  },
});

export const { setNewTheme } = artistSlice.actions;
export default artistSlice.reducer;
