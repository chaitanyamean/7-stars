import { configureStore } from "@reduxjs/toolkit";

import priceSlice from "./slices/priceSlice";
import quantitySlice from "./slices/quantitySlice";
import flavourSlice from "./slices/flavourSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    priceSlice: priceSlice,
    quantitySlice: quantitySlice,
    flavourSlice: flavourSlice,
  },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 

export default store;
