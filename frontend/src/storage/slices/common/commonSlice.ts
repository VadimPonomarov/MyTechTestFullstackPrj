import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {AlertMessageEnum, AlertTypeEnum, initialState} from "./constants";
import {IAlertInfo, IInitialState} from "./interfaces";

const mapSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setAlert(state, action: PayloadAction<IAlertInfo>) {
            state.alertInfo = action.payload;
            state.isAlert = true
        },
        clearAlert(state, action: PayloadAction) {
            state.alertInfo = initialState.alertInfo
            state.isAlert = false
        },
        setPending(state, action: PayloadAction) {
            state.isPending = true;
        },
        clearPending(state, action: PayloadAction) {
            state.isPending = false;
        },
    }
});

export const {
    setAlert,
    clearAlert,
    setPending,
    clearPending,
} = mapSlice.actions;
export default mapSlice.reducer;