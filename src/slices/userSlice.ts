import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import Cookies from "universal-cookie";

const { LOCAL_HOST } = process.env;
const cookies = new Cookies();

type SliceState = {
  loading: boolean,
  isLogin: boolean,
  status: null | string,
  error: null | string,
  errorValidate: { email: string, password: string, confirmPassword: string },
  user: { accessToken: string, refreshToken: string },
};

const initialState : SliceState = {
  loading: true,
  isLogin: cookies.get("AccessToken") !== "",
  status: null,
  error: null,
  errorValidate: { email: "error", password: "error", confirmPassword: "error" },
  user: { accessToken: "", refreshToken: "" },
};

export const getAuthToken = createAsyncThunk(
  "user/getAuthToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${LOCAL_HOST}/auth/login`, {
        username: "demoUser",
        password: "111",
      });
      cookies.set("AccessToken", response.data.accessToken, { sameSite: "strict" });
      cookies.set("RefreshToken", response.data.refreshToken, { sameSite: "strict" });
      console.log(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const refreshJWT = createAsyncThunk(
  "user/refreshJWT",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${LOCAL_HOST}/auth/refresh`, {
        refreshToken: cookies.get("RefreshToken"),
      });
      console.log("data", response.data);
      return response.data;
 
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async ( { email, password }: { email: string; password: string }, { rejectWithValue }) => {
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

      if (response.status === 201) {
        const { accessToken, refreshToken } = response.data;
        console.log("dscsd", accessToken);
        cookies.set("AccessToken", accessToken, { sameSite: "strict" });
        cookies.set("RefreshToken", refreshToken, { sameSite: "strict" });
      }

      return { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ( { email, password, confirmPassword }: { email: string; password: string; confirmPassword: string }, { rejectWithValue }) => {
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

      if (response.status === 201) {
        const { accessToken, refreshToken } = response.data;
        console.log("dscsd", accessToken);
        cookies.set("AccessToken", accessToken, { sameSite: "strict" });
        cookies.set("RefreshToken", refreshToken, { sameSite: "strict" });
      }

      return { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
    } catch (error) {
      console.log("response", error);
      return rejectWithValue((error as Error).message);
    }
  },
);

const setError = (state: any, action: any) => {
  state.status = "rejected";
  state.error = action.payload;
};

const artistSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUser(state, action) {
      state.user = { accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken };
    },
    setLogin(state, action){
      if (action.payload === false ) {
        cookies.set("AccessToken", "", { sameSite: "strict" });
        cookies.set("RefreshToken", "", { sameSite: "strict" });
      }
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
    builder.addCase(getAuthToken.fulfilled, (state) => {
      state.status = "resolved";
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

    builder.addCase(refreshJWT.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(refreshJWT.fulfilled, (state, action) => {
      state.status = "resolved";
      console.log("action", action.payload);
      state.user.accessToken = action.payload.accessToken;
      state.user.refreshToken = action.payload.refreshToken;
      state.isLogin = true;
    });
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

    builder.addCase(refreshJWT.rejected, setError);
  },
});

export const { setLoading, setUser, setLogin, checkEmptyField } = artistSlice.actions;
export default artistSlice.reducer;
