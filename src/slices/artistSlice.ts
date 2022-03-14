import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { WritableDraft } from "immer/dist/types/types-external";
import axios from 'axios';
import * as  data from "../../db.json";

interface TypeArtists {
  id: string;
  paintings: string[];
  genres: string[];
  name: string;
  description:string;
  yearsOfLife: string;
  avatar: string;
  mainPainting: string;
}

interface TypePaintings {
  id: string;
  name: string;
  yearOfCreation: string;
  image: string;
  artist: string;
}

interface TypeGenres {
  id: string;
  name: string;
}

interface TypeImages {
  id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
}

type SliceState = {
  arr_artists: TypeArtists[],
  arr_genres: TypeGenres[],
  arr_paintings: TypePaintings[],
  arr_images: TypeImages[],
  theme: "light" | "dark",
  loading: boolean,
  isLogin: boolean,
  status: null | string,
  error: null | string,
};

const initialState : SliceState = {
  arr_artists: [],
  arr_genres: [],
  arr_paintings: [],
  arr_images: [],
  theme: "light",
  loading: true,
  isLogin: false,
  status: null,
  error: null,
};

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3002/artists/`, {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        withCredentials: true,
        // credentials: 'same-origin',
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getPaintings = createAsyncThunk(
  "artists/getPaintings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3002/paintings/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getGenres = createAsyncThunk(
  "artists/getGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3002/genres/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getImages = createAsyncThunk(
  "artists/getImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3002/images/`);
      console.log(response.data);
      return response.data;
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
      state.arr_artists = action.payload;
    });
    builder.addCase(getPaintings.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getPaintings.fulfilled, (state, action) => {
      state.status = "resolved";
      state.arr_paintings = action.payload;
    });
    builder.addCase(getGenres.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.status = "resolved";
      state.arr_genres = action.payload;
    });
    builder.addCase(getImages.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getImages.fulfilled, (state, action) => {
      state.status = "resolved";
      state.arr_images = action.payload;
      state.loading = false;
    });

    builder.addCase(getArtists.rejected, setError);
    builder.addCase(getPaintings.rejected, setError);
    builder.addCase(getGenres.rejected, setError);
    builder.addCase(getImages.rejected, setError);
  },
});

export const { setNewTheme, setLoading, setLogin } = artistSlice.actions;
export default artistSlice.reducer;
