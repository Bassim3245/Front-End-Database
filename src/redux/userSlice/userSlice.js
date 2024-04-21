import { createSlice,  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { registerUser, loginUser, getAllDataUser } from "./authActions"
export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    data: [],
    Rol:null,
    code:false,
    isFetching: false,
    isSuccess: false,
    isSuccessMessage:false,
    isError: false,
    message: "",
  },
  reducers: {

    logout: () => {
      localStorage.clear();
        window.location.reload(false);
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {//state for register user
        state.loading = true
        state.isError = null
      })
      .addCase(registerUser.fulfilled, (state, payload) => {
        state.loading = false
        state.isSuccess = true // registration isSuccessful
        state.message = payload.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.isError = action.payload
        state.message = action.payload
      })
      .addCase(loginUser.pending, (state) => {//state for login user
        state.loading = true
        state.isError = null
      })
      .addCase(loginUser.fulfilled, (state, {payload:{dataobj,message,token}}) => {
        state.isError=false
        state.isSuccess = true
        state.message = message
        localStorage.setItem("user",JSON.stringify(dataobj))
        state.Rol=dataobj.user_type
        state.code=dataobj.code
        localStorage.setItem("token",token)})
      .addCase(loginUser.rejected, (state, action) => {
        console.log('error', action);
        state.loading = false
        state.isError = action.payload
      })
      builder
      .addCase(getAllDataUser.pending, (state) => {
        state.loading = true
        state.isError = null
      })
     .addCase(getAllDataUser.fulfilled, (state, {payload}) => {
        state.loading = false
        state.isSuccessMessage = true 
        state.data = payload
      })
      .addCase(getAllDataUser.rejected, (state, {payload}) => {
        state.loading = false
        state.isError = true
        state.isSuccessMessage=false
        state.message = payload
      })
  }
}
)
export default userSlice.reducer
export const { clearState, login,logout } = userSlice.actions;
export const userSelector = (state) => state.user;
