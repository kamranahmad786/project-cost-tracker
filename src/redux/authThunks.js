import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setLoading, setError, clearUser } from './authSlice';
import { registerUser, loginUser, logoutUser } from '../services/authService';

export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const user = await registerUser(email, password);
      dispatch(setUser({
        uid: user.uid,
        email: user.email
      }));
      return user;
    } catch (error) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const signinUser = createAsyncThunk(
  'auth/signin',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const user = await loginUser(email, password);
      dispatch(setUser({
        uid: user.uid,
        email: user.email
      }));
      return user;
    } catch (error) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const signoutUser = createAsyncThunk(
  'auth/signout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await logoutUser();
      dispatch(clearUser());
      return null;
    } catch (error) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);