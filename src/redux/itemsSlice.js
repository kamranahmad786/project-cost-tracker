import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setItemsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setItemsError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { 
  setItems, 
  addItem, 
  updateItem, 
  deleteItem, 
  setItemsLoading, 
  setItemsError 
} = itemsSlice.actions;
export default itemsSlice.reducer;