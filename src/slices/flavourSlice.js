import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  flavour: [],
  error: "",
};

export const fetchFlavours = createAsyncThunk("user/flavour", () => {
  return axios
    .get(`${import.meta.env.VITE_API_KEY}/getallflavours`)
    .then((response) => response.data);
});

const flavourSlice = createSlice({
  name: "flavour",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFlavours.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFlavours.fulfilled, (state, action) => {
      state.loading = false;
      state.flavour = action.payload;
      state.error = "";
    });
    builder.addCase(fetchFlavours.rejected, (state, action) => {
      state.loading = false;
      state.flavour = [];
      state.error = action.error.message;
    });
  },
});

export default flavourSlice.reducer;
