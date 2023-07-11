import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {initialState, initialTask} from "./constants";
import {ITask} from "./interfaces";
import {_axiosService} from "../../services";
import {clearPending, setAlert, setPending} from "../common/commonSlice";
import {AlertMessageEnum, AlertTypeEnum} from "../common/constants";

export const createTask = createAsyncThunk<{}, ITask>(
    "task/createTask",
    async (body, {dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.postTask(body);
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return await dispatch(clearPending())
            }
            dispatch(setNewTask(response.data.data))
            dispatch(clearPending())
        } catch (e) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(clearPending());
        }
    });

export const updateTask = createAsyncThunk<{}, { taskId: number | string, body: ITask }>(
    "task/createTask",
    async ({taskId, body}, {dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.putTask(taskId, body);
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return await dispatch(clearPending())
            }
            dispatch(setUpdateTask(response.data.data))
            dispatch(clearPending())
        } catch (e) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(clearPending());
        }
    });

export const deleteTask = createAsyncThunk<undefined, number, { dispatch: any }>(
    "task/deleteTask",
    async (id, {dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.deleteTask(id);
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return await dispatch(clearPending())
            }
            dispatch(deleteTaskById(id))
            dispatch(clearPending())
        } catch (e) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(clearPending());
        }
    });

export const getTaskAllByCategoryId = createAsyncThunk<{}, number | string>(
    "task/getTaskAllByCategoryId",
    async (categoryId, {dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.getTaskAllByCategoryId(categoryId);
            if (response.status >= 400) {
                (clearPending());
                (setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return await dispatch(clearPending())
            }
            dispatch(setTaskList(response.data.data))
            dispatch(clearPending())
        } catch (e) {
            dispatch(setAlert({
                type: AlertTypeEnum.ERROR,
                message: AlertMessageEnum.FAILURE
            }))
            dispatch(clearPending());
        }
    });


const taskSlice = createSlice({
        name: 'task',
        initialState,
        reducers: {
            setModal(state, action: PayloadAction<boolean>) {
                state.isModal = action.payload
            },
            setSubmit(state, action: PayloadAction<boolean | undefined>) {
                state.isSubmit = action.payload
            },
            setNewTask(state, action: PayloadAction<ITask>) {
                state.tasks = [action.payload, ...state.tasks]
            },
            setCurrentTask(state, action: PayloadAction<ITask>) {
                state.currentTask = action.payload
            },
            clearCurrentTask(state, action: PayloadAction<undefined | null>) {
                state.currentTask = initialTask
            },
            setCurrentTaskById(state, action: PayloadAction<number | undefined>) {
                const task = state.tasks.find(item => item.id === action.payload)
                if (task) state.currentTask = task
            },
            setCurrentTaskEmpty(state, action: PayloadAction<undefined | null>) {
                state.currentTask = initialTask
            },
            setTaskList(state, action: PayloadAction<ITask[]>) {
                state.tasks = [...action.payload]
            },
            setUpdateTask(state, action: PayloadAction<ITask>) {
                state.tasks = [...state.tasks.map(item => {
                    if (item.id === action.payload.id)
                        return action.payload
                    return item
                })]
            },
            deleteTaskById(state, action: PayloadAction<number | undefined>) {
                state.tasks = [...state.tasks.filter(item => item.id !== action.payload)]
            },
        }
    })
;

export const {
    setCurrentTask,
    setSubmit,
    setCurrentTaskEmpty,
    setTaskList,
    setCurrentTaskById,
    setUpdateTask,
    setNewTask,
    deleteTaskById,
    clearCurrentTask,
    setModal
} = taskSlice.actions;
export default taskSlice.reducer;