import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import Cookies from "universal-cookie";
import { TypeArtists, TypeGenres, TypePaintings } from "../utils/Types";
import { refreshJWT } from "./userSlice";

const { LOCAL_HOST } = process.env;
const cookies = new Cookies();

type SliceState = {
  arr_artists: TypeArtists[],
  arr_genres: TypeGenres[],
  arr_paintings: TypePaintings[],
  theme: "light" | "dark",
  loading: boolean,
  
  status: null | string,
  error: null | string,
  
  artist: TypeArtists | null,
};

const initialState : SliceState = {
  arr_artists: [],
  arr_genres: [],
  arr_paintings: [],
  theme: cookies.get("theme") === "" ? "light" : cookies.get("theme"),
  loading: true,
  
  status: null,
  error: null,

  artist: null,
};

const header = (body?: any) => {
  const authToken = cookies.get("AccessToken");
  console.log("token", authToken);
  return ({
    body,
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
    withCredentials: true,
  });
};

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${LOCAL_HOST}/artists`, header());
      console.log(response.data);
      if (response.status === 401) {
        await dispatch(refreshJWT());
        const newResponse = await axios.get(`${LOCAL_HOST}/artists`, header());
        console.log(newResponse.status);
        return newResponse.data;
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getStaticArtists = createAsyncThunk(
  "artists/getStaticArtists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${LOCAL_HOST}/artists/static` );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getPaintingsOfArtist = createAsyncThunk(
  "artists/getPaintingsOfArtist",
  async ( id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${LOCAL_HOST}/artists/${id}`, header());
      if (response.status === 401) {
        await dispatch(refreshJWT());
        const newResponse = await axios.get(`${LOCAL_HOST}/artists/${id}`, header());
        console.log(newResponse.status);
        return newResponse.data;
      }
      console.log(response.data.paintings);
      return response.data.paintings;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const setFavoritePaint = createAsyncThunk(
  "artists/setFavoritePaint",
  async ( { artistId, paintId } : { artistId:string, paintId:string }, { rejectWithValue, dispatch }) => {
    try {
      console.log(artistId, paintId);
      const response = await axios.patch(`${LOCAL_HOST}/artists/${artistId}/main-painting`, header({ artistId: artistId, _id: paintId }));
      if (response.status === 401) {
        console.log("refresh token");
        await dispatch(refreshJWT());
        const newResponse = await axios.get(`${LOCAL_HOST}/artists/${artistId}/main-painting`, header({ artistId: artistId, _id: paintId }));
        console.log(newResponse.status);
        return newResponse.data;
      }
      console.log("new paint favorite", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getGenres = createAsyncThunk(
  "artists/getGenres",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${LOCAL_HOST}/genres/`, header());
      if (response.status === 401) {
        await dispatch(refreshJWT());
        const newResponse = await axios.get(`${LOCAL_HOST}/genres/`, header());
        console.log(newResponse.status);
        return newResponse.data;
      }
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
    setArtist(state, action) {
      state.artist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getArtists.fulfilled, (state, action) => {
      state.status = "resolved";
      console.log(action.payload);
      state.arr_artists = action.payload;
    });
    builder.addCase(getStaticArtists.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getStaticArtists.fulfilled, (state, action) => {
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
    builder.addCase(getArtists.rejected, setError);
    builder.addCase(getStaticArtists.rejected, setError);
    builder.addCase(getGenres.rejected, setError);
    builder.addCase(getPaintingsOfArtist.rejected, setError);
  },
});

export const { setNewTheme, setLoading, setArtist } = artistSlice.actions;
export default artistSlice.reducer;
