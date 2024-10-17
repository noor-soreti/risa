import { createSlice } from "@reduxjs/toolkit"
import { getChatLogs } from "./chatLogThunk"

interface ChatLogState {
    chatLog: Set<IChatLog> | null
    loading: boolean,
    error: string | null
}

const initialState: ChatLogState = {
    chatLog: null,
    loading: false,
    error: null
}

const chatLogSlice = createSlice({
    name: 'chatLog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getChatLogs.pending, (state) => {
            state.loading = true
        })
        .addCase(getChatLogs.fulfilled, (state, action) => {
            state.chatLog = action.payload
            state.loading = false
        })
        .addCase(getChatLogs.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { } = chatLogSlice.actions
export default chatLogSlice.reducer