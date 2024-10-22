import { createSlice } from "@reduxjs/toolkit"
import { createChatLog, getUserChatLogs } from "./chatLogThunk"

const initialState: IChatLogState = {
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
        // get chatlogs
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

        // create chatlog
        .addCase(createChatLog.pending, (state) => {
            state.loading = true
        })
        .addCase(createChatLog.fulfilled, (state, action) => {
            state.chatLog = action.payload
            state.loading = false
        })
        .addCase(createChatLog.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error
        })

    }
})

export const { } = chatLogSlice.actions
export default chatLogSlice.reducer