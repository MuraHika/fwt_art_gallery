import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { TypeArtists, TypeGenres, TypePaintings } from "../utils/Types";

const { LOCAL_HOST } = process.env;

type SliceState = {
  arr_artists: TypeArtists[],
  arr_genres: TypeGenres[],
  arr_paintings: TypePaintings[],
  theme: "light" | "dark",
  loading: boolean,
  isLogin: boolean,
  authToken: string,
  status: null | string,
  error: null | string,
};

const initialState : SliceState = {
  arr_artists: [],
  arr_genres: [],
  arr_paintings: [],
  theme: "light",
  loading: true,
  isLogin: false,
  authToken: "",
  status: null,
  error: null,
};

const header = () => {

  const authToken = document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === "token" ? decodeURIComponent(parts[1]) : r;
  }, '');
  console.log("token", authToken);
  return ({
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
    withCredentials: true,
  });
};

export const getAuthToken = createAsyncThunk(
  "artists/getAuthToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${LOCAL_HOST}auth/login`, {
        username: "demoUser",
        password: "111",
      });

      document.cookie = `token=${response.data.accessToken}`;
      console.log(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`${LOCAL_HOST}artists/`, header());
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getPaintingsOfArtist = createAsyncThunk(
  "artists/getPaintingsOfArtist",
  async ( id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${LOCAL_HOST}artists/${id}`, header());
      console.log(response.data.paintings);
      return response.data.paintings;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getGenres = createAsyncThunk(
  "artists/getGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${LOCAL_HOST}genres/`, header());
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
    builder.addCase(getGenres.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.status = "resolved";
      state.arr_genres = action.payload;
    });
    builder.addCase(getPaintingsOfArtist.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getPaintingsOfArtist.fulfilled, (state, action) => {
      state.status = "resolved";
      state.arr_paintings = action.payload;
    });
    builder.addCase(getAuthToken.fulfilled, (state, action) => {
      state.status = "resolved";
      state.authToken = action.payload;
    });

    builder.addCase(getArtists.rejected, setError);
    builder.addCase(getGenres.rejected, setError);
    builder.addCase(getPaintingsOfArtist.rejected, setError);
  },
});

export const { setNewTheme, setLoading, setLogin } = artistSlice.actions;
export default artistSlice.reducer;
