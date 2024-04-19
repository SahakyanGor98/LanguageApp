import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../api/axios";
import { setLoading } from "../loading/loadingSlice";
import { setUserID, setToken, clearAuth, setError, clearError, setStatus } from "./authSlice";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email: payload.email,
          password: payload.password,
        },
        {
          headers: {
            "X-platform": "web",
          },
          withCredentials: true,
        }
      );
      console.log("Login thunk RESPONSE", response);
      thunkAPI.dispatch(setUserID(response.data.value.user.id));
      thunkAPI.dispatch(setToken(response.data.value.accessToken));
      thunkAPI.dispatch(clearError())
    } catch (error: any) {
      console.log("Login thunk ERROR ", error);
      thunkAPI.dispatch(setError(error.response.data.message));
    } finally {
      setTimeout(() => thunkAPI.dispatch(setLoading(false)), 1000);
      ;
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      thunkAPI.dispatch(clearAuth());
      await axios.delete(`${BASE_URL}/api/auth/logout`, {
        headers: {
          "X-platform": "web",
        },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    payload: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      password: string;
      birthDate: string;
    },
    thunkAPI
  ) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/registration`,
        {
          ...payload,
        },
        {
          headers: {
            "X-platform": "web",
          },
        }
      );
      console.log("userRegister THUNK - RESPONSE:", response);
      thunkAPI.dispatch(setUserID(response.data.value.id));
      thunkAPI.dispatch(setStatus(true));
      thunkAPI.dispatch(setError(""));
    } catch (error: any) {
      console.log("ERROR", error.response.data.message);
      thunkAPI.dispatch(setError(error.response.data.message));
      thunkAPI.dispatch(setStatus(false));
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const userResendCode = createAsyncThunk(
  "auth/resend",
  async (userId: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/auth/resend`,
        {
          userId
        },
        {
          headers: {
            "X-platform": "web",
          }
        }
      )
      thunkAPI.dispatch(setLoading(false));
      console.log("Resend RESPONSE", response);
      return response.data;
    } catch (error: any) {
      thunkAPI.dispatch(setLoading(false));
      console.log("Resend ERROR", error);
    }
  }
)

export const userActivate = createAsyncThunk(
  "auth/activate",
  async (payload: { code: string; userId: string }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/auth/activate`,
        {
          verificationCode: payload.code,
          userId: payload.userId,
        },
        {
          headers: {
            "X-platform": "web",
          },
        }
      );
      thunkAPI.dispatch(setUserID(response.data.value.user.id));
      thunkAPI.dispatch(setToken(response.data.value.accessToken));
      thunkAPI.dispatch(setError(""));
      console.log(response);
      return response.data;
    } catch (error: any) {
      thunkAPI.dispatch(setError(error.response.data.message));
      throw error;
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const sendEmailToForgotPswd = createAsyncThunk(
  "auth/forgot",
  async (payload: { userEmail: string }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/auth/forgot-password`,
        {
          email: payload.userEmail,
        },
        {
          headers: {
            "X-platform": "web",
          }
        }
      );
      console.log("1 RESPONSE - Send email to forgot password RESPONSE:", response);
      thunkAPI.dispatch(setUserID(response.data.value.id));
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const fourDigitsForgotPswd = createAsyncThunk(
  "auth/password-reset",
  async (payload: { verificationCode: string; userId: string }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      if (payload.userId) {
        const response = await axios.post(
          `${BASE_URL}/api/auth/forgot-password`,
          {
            userId: payload.userId,
            verificationCode: payload.verificationCode,
          },
          {
            headers: {
              "X-platform": "web",
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      throw error;
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const setNewPassword = createAsyncThunk(
  "auth/password-recreate",
  async (payload: { password: string; userId: string }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/auth/reset-password`,
        {
          password: payload.password,
          userId: payload.userId,
        },
        {
          headers: {
            "X-platform": "web",
          },
        }
      );
      console.log("3 RESPONSE - Set new password response:", response);
      return response.data;
      // thunkAPI.dispatch(setUserID(response.data.value.id));
    } catch (error: any) {
      console.log("3 ERROR", error?.response?.data?.message);
      // thunkAPI.dispatch(setError(error?.response?.data?.message));
    }
  }
);
