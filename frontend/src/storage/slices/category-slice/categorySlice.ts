import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {initialCategory, initialState} from "./constants";
import {ICategory} from "./interfaces";
import {_axiosService} from "../../services";
import {clearPending, setAlert, setPending} from "../common/commonSlice";
import {AlertMessageEnum, AlertTypeEnum} from "../common/constants";

export const createCategory = createAsyncThunk<ICategory, ICategory,
    { dispatch: any }>(
    "category/createCategory",
    async (body, {dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.postCategory(body);
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return dispatch(clearPending())
            }
            dispatch(clearPending())
            dispatch(setCategoryInList(response.data.data))
        } catch (e) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(clearPending());
        }
    });

export const updateCategory = createAsyncThunk<ICategory, { id: number, data: ICategory },
    { dispatch: any }>(
    "category/updateCategory",
    async ({id, data}, {dispatch, fulfillWithValue, getState}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.putCategory(id, {name: data.name});
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return dispatch(clearPending())
            }
            dispatch(clearPending())
            dispatch(updateCategoryInList(response.data.data))
        } catch (e) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(clearPending());
        }
    });

export const deleteCategory = createAsyncThunk<unknown, number>(
    "category/deleteCategory",
    async (id, {dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.deleteCategory(id);
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return dispatch(clearPending())
            }
            dispatch(clearPending())
            dispatch(deleteCategoryFromList(id))
        } catch (e) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(clearPending());
        }
    });

export const getAll = createAsyncThunk<ICategory[] | undefined, undefined,
    { dispatch: any }>(
    "category/getAll",
    async (_, {dispatch, fulfillWithValue, getState}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.getCaregories();
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return await dispatch(clearPending())
            }
            dispatch(clearPending())
            return fulfillWithValue(response.data.data)
        } catch (e) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(clearPending());
        }
    });

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setSubmit(state, action: PayloadAction<boolean | undefined>) {
            state.isSubmit = action.payload
        },
        setCategoryCurrentEmpty(state, action: PayloadAction<boolean | undefined>) {
            state.currentCategory = initialCategory
        },
        setCategoryCurrentById(state, action: PayloadAction<{ id: number }>) {
            const category = state.categories
                .find(item => item.id === action.payload.id)
            if (!category) return
            state.currentCategory = category
        },
        setCategoryList(state, action: PayloadAction<ICategory[]>) {
            state.categories = action.payload
        },
        setCategoryInList(state, action) {
            state.categories = [...state.categories, action.payload]
        },
        updateCategoryInList(state, action: PayloadAction<ICategory>) {
            state.categories = [...state.categories.map(item =>
                (item.id === action.payload.id) ? action.payload : item
            )]
        },
        deleteCategoryFromList(state, action: PayloadAction<number>) {
            state.categories = [...state.categories.filter(item => item.id !== action.payload)]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.categories = action.payload as ICategory[];
                state.currentCategory = initialCategory;
            })
    }
});

export const {
    setCategoryCurrentEmpty,
    setSubmit,
    setCategoryCurrentById,
    updateCategoryInList,
    setCategoryInList,
    deleteCategoryFromList,
    setCategoryList
} = categorySlice.actions;
export default categorySlice.reducer;