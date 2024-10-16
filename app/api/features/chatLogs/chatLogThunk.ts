import { createAsyncThunk } from "@reduxjs/toolkit";

export const getChatLogs = createAsyncThunk(
    'chatLog/getChatLogs',
    async (e, {rejectWithValue}) => {
        try {
            return e
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)