import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  otherCosts: [],
  isLoading: false,
  error: null,
};

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState,
  reducers: {
    setOtherCosts: (state, action) => {
      state.otherCosts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addOtherCost: (state, action) => {
      state.otherCosts.push(action.payload);
    },
    updateOtherCost: (state, action) => {
      const index = state.otherCosts.findIndex(cost => cost.id === action.payload.id);
      if (index !== -1) {
        state.otherCosts[index] = action.payload;
      }
    },
    deleteOtherCost: (state, action) => {
      state.otherCosts = state.otherCosts.filter(cost => cost.id !== action.payload);
    },
    setOtherCostsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOtherCostsError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { 
  setOtherCosts, 
  addOtherCost, 
  updateOtherCost, 
  deleteOtherCost, 
  setOtherCostsLoading, 
  setOtherCostsError 
} = otherCostsSlice.actions;
export default otherCostsSlice.reducer;