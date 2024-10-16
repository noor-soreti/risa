import { createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "../../axiosApiFunctions";

/*
createAsyncThunk 
-> used to create async action (thunk)
-> Redux Toolkit generates the following three actions:
    1. Pending: dispatched when async operation starts
    2. Fulfilled: dispatched when async operation succeeds
    3. Rejected: dispatched when async operation fails
-> these actions can be handled in extraReducers
*/

// thunk to handle user login
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({...userData} : any, {rejectWithValue}) => {
        try {
            const response = await api.post('/api/user/login', userData)
            console.log(`RESPONSE DATA: ${response.data}`);
            return response.data
        } catch (error: any) {
            console.log(`user/loginUser ERROR STATUS: ${error}`);
            return rejectWithValue(error.status)
        }
    }
)

// thunk to handle user signup
export const register = createAsyncThunk(
    'user/registerUser',
    async ({...userData} : any, {rejectWithValue}) => {
        try {
            const response = await api.post('/api/user/register', userData)
            // if (response.status != 200) {
            //     throw new Error("Failed to register user")
            // }
            console.log(response.data);
            
            return response.data
        } catch (error : any) {            
            console.log(`TYPEOF: error - ||${error}|| is type **${typeof(error)}**`)
            console.log(`TYPEOF: error.status - ||${error.status}|| is type **${typeof(error.status)}**`)
            console.log(`RWS: ${JSON.stringify(rejectWithValue(JSON.parse(error.status)))}`);
            console.log(`RWS: ${JSON.stringify(rejectWithValue(error.status))}`);
            console.log("-----");
            return rejectWithValue(error.status)
        }
    }
)