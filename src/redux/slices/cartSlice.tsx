import { createSlice , PayloadAction} from "@reduxjs/toolkit";
import { products } from "../../interface";

const initialState : products[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action:PayloadAction<products>) {
      state.push(action.payload);
    },
    remove(state, action : PayloadAction<number>) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;