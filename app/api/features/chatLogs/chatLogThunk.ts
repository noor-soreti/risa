import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosApiFunctions";

export const getUserChatLogs = createAsyncThunk(
    'chatLog/getUserChatLogs',
    async (uid: number, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/chatlog/userid/${uid}`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.status)
        }
    }
)

export const createChatLog = createAsyncThunk(
    'chatLog/createChatLog',
    async (uids: Set<number>, {rejectWithValue}) => {
        try {
            const response = await api.post(`/api/chatlog`, uids)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.status)
        }
    }
)