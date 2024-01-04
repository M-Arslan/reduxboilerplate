import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../Store'

// Define a type for the slice state
interface GridState {
    currentUser:Object,
    isFetching:Boolean
}

// Define the initial state using that type
const initialState: GridState = {
    currentUser:{},
    isFetching:false
}



export const AuthSlice = createSlice({
    name: 'Auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAuthUser: (state = initialState, action: PayloadAction<any>) => {
            const { type, payload } = action.payload;
            switch (type) {
                case "PROCESS_AUTH_USER":
                    return {
                        ...state,
                        isFetching: true
                    };
                case "SET_AUTH_USER":
                    return {
                        ...state,
                        currentUser:payload.currentUser
                    };

                default:
                    break;
            }
        },

    },
})

export const { setAuthUser } = AuthSlice.actions

export default AuthSlice.reducer;