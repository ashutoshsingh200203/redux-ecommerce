import { createSlice , PayloadAction} from "@reduxjs/toolkit";
import { products } from "../../interface";
interface prostate{
  prod : products[]
}
const initialState : prostate = {prod:[]};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action:PayloadAction<products>) {
      const product = state.prod.find(item => item.id === action.payload.id)
      if(product)
      {
       product.quantity += 1 ;
       product.total = product.quantity * product.price
      }
      else{
        state.prod.push(action.payload)
      }
    },
    addQuantity(state , action : PayloadAction<number>) {
       const product = state.prod.find(item => item.id === action.payload)
       if(product)
       {
        product.quantity += 1 ;
        product.total = product.quantity * product.price
       }
    },
    removeQuantity(state , action : PayloadAction<number>){
      const product = state.prod.find(item => item.id === action.payload)
      if(product)
      {
       product.quantity -= 1 ;
       product.total = product.quantity * product.price
      }
    }
  },
});

export const { add , addQuantity , removeQuantity } = cartSlice.actions;
export default cartSlice.reducer;