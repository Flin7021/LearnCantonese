import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllFlashcards } from '../api';

const fetchAllFlashcards = createAsyncThunk(
  'allFlashcards/fetchAllFlashcards',
  async () => {
    try {
      const response = await getAllFlashcards();
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch all flashcards');
    }
  }
);

const allFlashcardsSlice = createSlice({
  name: 'allFlashcards',
  initialState: {
    flashcards: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFlashcards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllFlashcards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flashcards = action.payload;
      })
      .addCase(fetchAllFlashcards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default allFlashcardsSlice.reducer;
