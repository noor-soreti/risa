import { createSlice } from "@reduxjs/toolkit"
import { getChatLogMessages, postMessage } from "./messageThunk"

const initialState: IMessageState = {
    message: null,
    loading: false,
    error: null
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // getMessage
        .addCase(getChatLogMessages.pending, (state) => {
            state.loading = true
        })
        .addCase(getChatLogMessages.fulfilled, (state, action) => {
            state.message = action.payload
            state.loading = false
        })
        .addCase(getChatLogMessages.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // postMessage
        .addCase(postMessage.pending, (state) => {
            state.loading = true
        })
        .addCase(postMessage.fulfilled, (state, action) => {
            state.message = action.payload
            state.loading = false
        })
        .addCase(postMessage.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {} = messageSlice.actions
export default messageSlice.reducer