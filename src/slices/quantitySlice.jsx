import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  quantity: [],
  error: "",
};

export const fetchQuantites = createAsyncThunk("user/quantity", () => {
  return axios
    .get(`${import.meta.env.VITE_API_KEY}/getallquanties`)
    .then((response) => response.data);
});

const quantitySlice = createSlice({
  name: "quantity",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchQuantites.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchQuantites.fulfilled, (state, action) => {
      state.loading = false;
      state.quantity = action.payload;
      state.error = "";
    });
    builder.addCase(fetchQuantites.rejected, (state, action) => {
      state.loading = false;
      state.quantity = [];
      state.error = action.error.message;
    });
  },
});

export default quantitySlice.reducer;
