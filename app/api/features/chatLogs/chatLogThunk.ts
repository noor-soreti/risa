import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosApiFunctions";

export const getUserChatLogs = createAsyncThunk(
    'chatLog/getUserChatLogs',
    async (userid: number, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/chatLog/userid/${userid}`)
            console.log(response.data);
            return response.data
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.status)
        }
    }
)