import { createSlice } from "@reduxjs/toolkit"
import { getUserContacts } from "./contactThunk"


const initialState: IContactState = {
    contacts: [],
    loading: false,
    error: null
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserContacts.pending, (state) => {
            state.loading = true
        })
        .addCase(getUserContacts.fulfilled, (state, action) => {
            state.contacts = action.payload
            state.loading = false
        })
        .addCase(getUserContacts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

    }
})

export const {} = contactSlice.actions
export default contactSlice.reducer