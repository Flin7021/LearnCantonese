import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllFlashcards = createAsyncThunk(
  "flashcards/fetchAll",
  async () => {
    try {
      const { data } = await axios.get("/api/flashcards");
      return data;
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
