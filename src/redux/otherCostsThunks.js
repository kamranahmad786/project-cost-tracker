import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  setOtherCosts, 
  addOtherCost, 
  updateOtherCost, 
  deleteOtherCost, 
  setOtherCostsLoading, 
  setOtherCostsError 
} from './otherCostsSlice';
import { 
  fetchOtherCosts, 
  addNewCost, 
  updateExistingCost, 
  deleteExistingCost 
} from '../services/otherCostsService';

export const fetchUserOtherCosts = createAsyncThunk(
  'otherCosts/fetchOtherCosts',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setOtherCostsLoading(true));
      const costs = await fetchOtherCosts(userId);
      dispatch(setOtherCosts(costs));
      return costs;
    } catch (error) {
      dispatch(setOtherCostsError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const createOtherCost = createAsyncThunk(
  'otherCosts/createOtherCost',
  async ({ userId, cost }, { dispatch, rejectWithValue }) => {
    try {
      const newCost = await addNewCost(userId, cost);
      dispatch(addOtherCost(newCost));
      return newCost;
    } catch (error) {
      dispatch(setOtherCostsError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const editOtherCost = createAsyncThunk(
  'otherCosts/editOtherCost',
  async ({ userId, cost }, { dispatch, rejectWithValue }) => {
    try {
      const updatedCost = await updateExistingCost(userId, cost);
      dispatch(updateOtherCost(updatedCost));
      return updatedCost;
    } catch (error) {
      dispatch(setOtherCostsError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const removeOtherCost = createAsyncThunk(
  'otherCosts/removeOtherCost',
  async ({ userId, costId }, { dispatch, rejectWithValue }) => {
    try {
      await deleteExistingCost(userId, costId);
      dispatch(deleteOtherCost(costId));
      return costId;
    } catch (error) {
      dispatch(setOtherCostsError(error.message));
      return rejectWithValue(error.message);
    }
  }
);