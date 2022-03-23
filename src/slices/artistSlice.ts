import { createSlice, createAsyncThunk, AsyncThunk, AsyncThunkConfig, AsyncThunkPayloadCreator, AsyncThunkOptions } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookie } from "../utils/getCookies";
import { TypeArtists, TypeGenres, TypePaintings } from "../utils/Types";

const { LOCAL_HOST } = process.env;

type SliceState = {
  arr_artists: TypeArtists[],
  arr_genres: TypeGenres[],
  arr_paintings: TypePaintings[],
  theme: "light" | "dark",
  loading: boolean,
  isLogin: boolean,
  authToken: { accessToken: string, refreshToken: string },
  status: null | string,
  error: null | string,
  errorValidate: { email: string, password: string, confirmPassword: string },
  user: { accessToken: string, refreshToken: string },
  artist: TypeArtists | null,
};

const initialState : SliceState = {
  arr_artists: [],
  arr_genres: [],
  arr_paintings: [],
  theme: "light",
  loading: true,
  isLogin: false,
  authToken: { 
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haWxAbS5ydSIsImlhdCI6MTY0Nzk0MzMwNiwiZXhwIjoxNjQ3OTY0OTA2fQ.gHoTA9ykcYQQEsbQE58NIjHyIFQlr8UAJKNSfgC0xGk",
    refreshToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haWxAbS5ydSIsImlhdCI6MTY0Nzk0MzMwNiwiZXhwIjoxNjUzMTI3MzA2fQ.RueJvWWJL4JICyX9WtI4ET3dKfkqLwJyOCvY2ivHlpA",
  },
  status: null,
  error: null,
  errorValidate: { email: "error", password: "error", confirmPassword: "error" },
  user: { accessToken: "", refreshToken: "" },
  artist: null,
};

declare module '@reduxjs/toolkit' {
  type AsyncThunkConfig = {
    state?: SliceState;
  };
}


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
      const response = await axios.post(`${LOCAL_HOST}/auth/login`, {
        username: "m@mail.ru",
        password: "Rhjkbr99!",
      });

      document.cookie = `token=${response.data.accessToken}`;
      console.log(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const checkJWT = createAsyncThunk(
  "artists/checkJWT",
  async (_, { rejectWithValue, getState, dispatch  }) => {
    try {
      const token = getCookie("token");
      const state = getState() as SliceState;
      if (token === "") {

        console.log("cookie", token);
      }
      if (token === "fdfvd") {
        // dispatch(setUser());
        const response = await axios.post(`${LOCAL_HOST}/auth/refresh`, {
          refreshToken: state.user.refreshToken,
        });
        console.log("data", response.data);
        return response.data;
      }
      

      // document.cookie = `token=${response.data.accessToken}`;
      // console.log(response.data.accessToken);
      // return response.data.accessToken;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const authUser = createAsyncThunk(
  "artists/authUser",
  async ( { email, password }: { email: string; password: string }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const isEmailValidate = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email);
      const isPasswordValidate = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}/.test(password);
      if (email.length > 50 || !isEmailValidate) {
        console.log("email validate", isEmailValidate);
        return rejectWithValue("");
      }
      if (!isPasswordValidate) {
        console.log("password validate", isPasswordValidate);
        return rejectWithValue("");
      }
      const response = await axios.post(`${LOCAL_HOST}/auth/login`, {
        username: email,
        password: password,
      });

      document.cookie = `token=${response.data.accessToken}`;
      return { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "artists/registerUser",
  async ( { email, password, confirmPassword }: { email: string; password: string; confirmPassword: string }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const isEmailValidate = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email);
      const isPasswordValidate = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}/.test(password);

      if (password !== confirmPassword) {
        return rejectWithValue("wrong confirmPassword");
      }

      if (email.length > 50 || !isEmailValidate) {
        console.log("email validate", isEmailValidate);
        return rejectWithValue("");
      }
      if (!isPasswordValidate) {
        console.log("password validate", isPasswordValidate);
        return rejectWithValue("wrong password");
      }

      const response = await axios.post(`${LOCAL_HOST}/auth/register`, {
        username: email,
        password: password,
      }).catch((error) => {
        if (error.request.status === 409) {
          return error.request;
        }
      });

      if (response.status === 409) {
        return rejectWithValue("wrong email");
      } 

      document.cookie = `token=${response.data.accessToken}`;
      return { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
    } catch (error) {
      console.log("response", error);
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${LOCAL_HOST}/artists`, header());
      console.log(response.data);
      if (response.status === 401) {
        console.log(response.status);
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
  async ( id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${LOCAL_HOST}/artists/${id}`, header());
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
      const response = await axios.get(`${LOCAL_HOST}/genres/`, header());
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
    setUser(state, action) {
      state.user = { accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken };
    },
    setArtist(state, action) {
      state.artist = action.payload;
    },
    setLogin(state, action){
      state.isLogin = action.payload;
    },
    checkEmptyField(state, action) {
      state.errorValidate = { email: "error", password: "error", confirmPassword: "error" };
      if (action.payload.email.length === 0) {
        state.errorValidate.email = "Enter your email address";
      }
      if (action.payload.password.length === 0) {
        state.errorValidate.password = "Enter your password";
      }
      if (action.payload.confirmPassword !== undefined && action.payload.confirmPassword.length === 0) {
        state.errorValidate.confirmPassword = "Confirm your password";
      }
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
    builder.addCase(getAuthToken.fulfilled, (state, action) => {
      state.status = "resolved";
      state.authToken = action.payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "resolved";
      state.user.accessToken = action.payload.accessToken;
      state.user.refreshToken = action.payload.refreshToken;
      state.isLogin = true;
      state.errorValidate = { email: "error", password: "error", confirmPassword: "error" };
    });
    builder.addCase(authUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.status = "resolved";
      console.log("action", action.payload);
      state.user.accessToken = action.payload.accessToken;
      state.user.refreshToken = action.payload.refreshToken;
      state.isLogin = true;
      state.errorValidate = { email: "error", password: "error", confirmPassword: "error" };
    });

    builder.addCase(getArtists.rejected, setError);
    builder.addCase(getStaticArtists.rejected, setError);
    builder.addCase(getGenres.rejected, setError);
    builder.addCase(getPaintingsOfArtist.rejected, setError);
    builder.addCase(authUser.rejected, (state:any) => {
      state.status = "wrong password or email";
      state.errorValidate.password = "Please make sure that you've entered your login and password correctly.";
    });
    builder.addCase(registerUser.rejected, (state:any, action:any) => {
      state.status = "wrong password or email";
      state.errorValidate = { email: "error", password: "error", confirmPassword: "error" };

      console.log("wroooooong");
      if (action.payload === "wrong email") {
        state.errorValidate.email = "User with same Email already exists";
      } else if (action.payload === "wrong password") {
        state.errorValidate.password = "Password must be more than 8 symbols and have at least one number, one capital letter and one special symbol";
      } else if (action.payload === "wrong confirmPassword") {
        state.errorValidate.confirmPassword = "Password don't match";
      }
    });
  },
});

export const { setNewTheme, setLoading, setUser, setArtist, setLogin, checkEmptyField } = artistSlice.actions;
export default artistSlice.reducer;
