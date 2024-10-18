import { createSlice } from "@reduxjs/toolkit"
import { getUserChatLogs } from "./chatLogThunk"

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
        .addCase(getUserChatLogs.pending, (state) => {
            state.loading = true
        })
        .addCase(getUserChatLogs.fulfilled, (state, action) => {
            state.chatLog = action.payload
            state.loading = false
        })
        .addCase(getUserChatLogs.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { } = chatLogSlice.actions
export default chatLogSlice.reducer