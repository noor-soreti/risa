import { configureStore } from '@reduxjs/toolkit'
import userReducer from "@/app/api/features/users/userReducer"
import { useDispatch, useSelector } from 'react-redux'
// import chatLogReducer from '@/app/api/features/chatLogs/chatlogReducer'


/*

state: 
    - state is READ-ONLY in Redux
    - in order to make a change to state we need to dispatch an action

action: 
    - describes what changes we want to make in state
    - actions are consumed by reducers

reducer:
    - a reducer accepts two things: (1) action and (2) state then returns new updated instance of state
    - *NOTE* reducers do not change state, they produce a new instance of state with necessary updates
        - *WHY?* makes state management predictable

configureStore:
    - standard method for creating Redux *store* -> core object that holds state tree of application
*/
export const store = configureStore({
    reducer: {
        user: userReducer,
        // chatLog: chatLogReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()