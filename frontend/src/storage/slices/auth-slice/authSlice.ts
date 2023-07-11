import {
    AnyAction,
    createAsyncThunk,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';

import {initialState} from "./constants";
import {
    IInitialState,
    ILoginInputs,
    IRegistrationInputs,
    IToken,
    TokenTypeEnum
} from "./interfaces";
import {_axiosService} from '../../services'
import {
    clearPending,
    setAlert,
    setPending
} from '../common/commonSlice';
import {AlertMessageEnum, AlertTypeEnum} from "../common/constants";

export const registration = createAsyncThunk<{}, IRegistrationInputs>(
    "auth/registration",
    async (body, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.postRegistration(body);
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                dispatch(setAuth(false))
                dispatch(clearPending())
            }
            dispatch(clearPending())
            dispatch(setAlert({
                type: AlertTypeEnum.SUCCESS,
                message: AlertMessageEnum.SUCCESS
            }))
            dispatch(setAuth(true))
        } catch (e) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(setAuth(false))
            dispatch(clearPending());
        }
    });
export const login = createAsyncThunk<{}, ILoginInputs>(
    "auth/login",
    async (body, {
        dispatch
    }) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.postLogin(body);
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return dispatch(clearPending())
            }
            dispatch(clearPending())
            await dispatch(setToken(response.data.data as IToken[]))

        } catch (error) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(setAuth(false))
            dispatch(clearPending());
        }
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        clearToken(state) {
            localStorage.removeItem(TokenTypeEnum.ACCESS);
        },
        setToken(state, action: PayloadAction<IToken[]>) {
            localStorage.setItem('tokenPair', JSON.stringify(action.payload))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isAuth = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuth = false;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {

            })
    },
})

const isError: (action: AnyAction) => boolean =
    (action: AnyAction) => action.type.endsWith('rejected')
export const {clearToken, setToken, setAuth} = authSlice.actions;
export default authSlice.reducer;
