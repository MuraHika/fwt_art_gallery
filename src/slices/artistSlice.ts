import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/types/types-external";
// import { artists } from "../../db.json";

interface TypeArtists {
  id: string | number;
  name: string;
  years_live: string;
  painting: string;
  created: string;
  image: string;
}

type SliceState = {
  artists: TypeArtists[],
  status: null | string,
  error: null | string,
};

const initialState : SliceState = {
  artists: [],
  status: null,
  error: null,
};

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async (_, { rejectWithValue }) => {
    try {
      console.log("work");
      return [];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const setError = (state: WritableDraft<SliceState>, action: any) => {
  state.status = "rejected";
  state.error = action.payload;
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getArtists.fulfilled, (state, action) => {
      state.status = "resolved";
      state.artists = action.payload;
    });
    builder.addCase(getArtists.rejected, setError);
  },
});

// export const {
//   getArtists,
// } = taskSlice.actions;
export default taskSlice.reducer;
