import { createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import { api } from "../../axiosApiFunctions";

export const getChatLogMessages = createAsyncThunk(
    'message/getChatLogMessages',
    async (chatlogId: any, {rejectWithValue} ) => {
        try {
            const response = await api.get(`api/message/chatlog/${chatlogId}/messages`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.status)
        }
    }
)

export const postMessage = createAsyncThunk(
    'message/postMessage',
    async ({...requestItems}: any, {rejectWithValue} ) => {
        console.log(requestItems);
        
        try {
            const response = await api.post(`api/message/sendMessage/${requestItems.chatId}`, requestItems.newMessage)
            return response.data
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.status)
        }
    }
)