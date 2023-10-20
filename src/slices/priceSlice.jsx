import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  prices: [],
  error: "",
};

export const fetchPrices = createAsyncThunk("user/fetchPrices", () => {
  return axios
    .get(`${import.meta.env.VITE_API_KEY}/getallprices`)
    .then((response) => response.data);
});

const priceSlice = createSlice({
  name: "price",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      state.loading = false;
      state.prices = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPrices.rejected, (state, action) => {
      state.loading = false;
      state.prices = [];
      state.error = action.error.message;
    });
  },
});

export default priceSlice.reducer;
