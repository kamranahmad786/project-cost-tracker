import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  setItems, 
  addItem, 
  updateItem, 
  deleteItem, 
  setItemsLoading, 
  setItemsError 
} from './itemsSlice';
import { 
  fetchItems, 
  addNewItem, 
  updateExistingItem, 
  deleteExistingItem 
} from '../services/itemsService';

export const fetchUserItems = createAsyncThunk(
  'items/fetchItems',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setItemsLoading(true));
      const items = await fetchItems(userId);
      dispatch(setItems(items));
      return items;
    } catch (error) {
      dispatch(setItemsError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async ({ userId, item }, { dispatch, rejectWithValue }) => {
    try {
      const newItem = await addNewItem(userId, item);
      dispatch(addItem(newItem));
      return newItem;
    } catch (error) {
      dispatch(setItemsError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const editItem = createAsyncThunk(
  'items/editItem',
  async ({ userId, item }, { dispatch, rejectWithValue }) => {
    try {
      const updatedItem = await updateExistingItem(userId, item);
      dispatch(updateItem(updatedItem));
      return updatedItem;
    } catch (error) {
      dispatch(setItemsError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  'items/removeItem',
  async ({ userId, itemId }, { dispatch, rejectWithValue }) => {
    try {
      await deleteExistingItem(userId, itemId);
      dispatch(deleteItem(itemId));
      return itemId;
    } catch (error) {
      dispatch(setItemsError(error.message));
      return rejectWithValue(error.message);
    }
  }
);