import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './types';


export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedLocation(state, action: PayloadAction<string | null>) {
      if (action.payload !== null) {
        state.selectedLocation = action.payload;
      }
    },
  },
});

export const { setSelectedLocation } = locationSlice.actions;