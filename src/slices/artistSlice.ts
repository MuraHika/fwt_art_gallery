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
  status: null | string,
  error: null | string,
};

const initialState : SliceState = {
  arr_artists: [],
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

const setError = (state: any, action: any) => {
  state.status = "rejected";
  state.error = action.payload;
};

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
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

// export const {
//   getArtists,
// } = taskSlice.actions;
export default artistSlice.reducer;
