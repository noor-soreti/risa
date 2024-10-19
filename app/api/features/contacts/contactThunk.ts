import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosApiFunctions";

export const getUserContacts = createAsyncThunk(
    'contact/getUserContacts',
    async (uid: number, {rejectWithValue}) => {
        try {
            console.log(uid);
            
            const response = await api.get(`/api/contact/id/${uid}`)
            console.log(response.data)
            return response.data            
        } catch (error: any) {
            return rejectWithValue(error.status)
        }
    }
)