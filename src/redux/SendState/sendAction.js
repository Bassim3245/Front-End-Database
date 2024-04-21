import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendUrl, token } from "../api/axios";
import axios from "axios";
export const sedRequest= createAsyncThunk("SendRequest/",async({projectID,departmentID},thunkAPI)=>{
try{
    const response=await axios.put(`${BackendUrl}/api/sendFile/${projectID}/${departmentID}`)

}catch(err){

}
})