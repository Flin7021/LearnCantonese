import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  db  from '../../../config/firebaseConfig'; // Import your Firebase database reference

export const fetchAllFlashcards = createAsyncThunk(
  "flashcards/fetchAll",
  async () => {
    try {
      const snapshot = await db.collection('flashcards').get(); // Fetch flashcards collection from Firebase
      const flashcards = snapshot.docs.map((doc) => doc.data()); // Extract the data from each document
      return flashcards;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const allFlashcardsSlice = createSlice({
  name: "flashcards",
  initialState: {
    allFlashcards: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFlashcards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllFlashcards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allFlashcards = action.payload;
      })
      .addCase(fetchAllFlashcards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default allFlashcardsSlice.reducer;
