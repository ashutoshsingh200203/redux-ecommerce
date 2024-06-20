import { createSlice} from "@reduxjs/toolkit";

interface auth {
  authenticated : boolean
}

const initialState : auth = {authenticated : false}

const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers :{
     setAuth(state) {
      state.authenticated = true
     },
     removeAuth(state) {
      state.authenticated = false 
     }
  }

})

export const { setAuth , removeAuth } = authSlice.actions;
export default authSlice.reducer;