import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../Store'

// Define a type for the slice state
interface GridState {
    value: number,
    riskStates: Array<Object>
    submissionStatuses: Array<Object>,
    monitoringCategories: Array<Object>,
    underwriters:Array<Object>,
    businessTypes: Array<Object>,
    divisions: Array<Object>,
    submissionTypes: Array<Object>
    isFetching:Boolean,
    error: string
    valuesAvailable:Boolean
}

// Define the initial state using that type
const initialState: GridState = {
    value: 0,
    isFetching:false,
    riskStates: [],
    submissionStatuses: [],
    underwriters:[],
    monitoringCategories: [],
    businessTypes: [],
    divisions: [],
    submissionTypes: [],
    valuesAvailable:false,
    error: ''
}



export const GridSlice = createSlice({
    name: 'Grid',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setDropdownValues: (state = initialState, action: PayloadAction<any>) => {
            const { type, payload } = action.payload;
            switch (type) {
                case "DROPDOWN_VALUES_PROCESSING":
                    return {
                        ...state,
                        isFetching: true,
                        error: "",
                    };
                case "DROPDOWN_VALUES_SUCCESS":
                    return {
                        ...state,
                        riskStates: payload?.riskStates,
                        submissionStatuses: payload?.submissionStatuses,
                        underwriters:payload?.underwriters,
                        monitoringCategories: payload?.monitoringCategories,
                        businessTypes: payload?.businessTypes,
                        divisions: payload?.divisions,
                        submissionTypes: payload?.submissionTypes,
                        isFetching: false,
                        valuesAvailable:payload.valuesAvailable,
                        error: "",
                    };
                case "DROPDOWN_VALUES_ERROR":
                    return {
                        ...state,
                        isFetching: false,
                        error: payload,
                    };

                default:
                    break;
            }
        },

    },
})

export const { setDropdownValues } = GridSlice.actions

export default GridSlice.reducer;