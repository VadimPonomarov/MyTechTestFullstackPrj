import React, {memo, useEffect} from 'react';

import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";

import {CancelSaveDialog} from './canselSaveDialog/cancelSaveDialog';
import {TaskEditForm} from "./editForm/taskEditForm";
import css from './index.module.scss'
import {TaskCard} from "./taskCard/taskCard";
import {useAppDispatch, useAppSelector} from "../../storage";
import {ITask} from "../../storage/slices/task-slice/interfaces";
import {clearCurrentTask, getTaskAllByCategoryId} from "../../storage/slices/task-slice/taskSlice";
import {IProps} from '../category/yesNoDialog/interfaces'

const _ListTask = () => {
    const cancelSaveDialogProps: IProps = {
        openButtonId: 'openButtonFormEditTask',
        dialogTitle: undefined,
        openButtonTitle: 'Add task',
        form: <TaskEditForm/>,
        formSelector: "#taskForm",
        contentText: undefined
    }
    const dispatch = useAppDispatch()
    const {tasks} = useAppSelector(state => state.task)

    const {
        isSubmit,
        currentCategory: {
            id: categoryId
        }
    } = useAppSelector(state => state.category)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
        getValues
    } =
        useForm<ITask>({
            mode: 'onChange',
        });

    useEffect(() => {
        if (categoryId)
            dispatch(getTaskAllByCategoryId(categoryId))
        dispatch(clearCurrentTask())
    }, [categoryId, dispatch])

    return (
        <Box className={css.main_box}>
            <Box className={css.create_edit_box}>
                <CancelSaveDialog data={cancelSaveDialogProps}/>
            </Box>
            <Box className={css.task_list_del_edit_box}>
                {tasks?.map((item: ITask) =>
                    <TaskCard
                        data={{
                            contentText: item.description,
                            dialogTitle: item.name,
                            taskId: item.id
                        }}/>
                )}
            </Box>
        </Box>
    );
};

export const ListTask = memo(_ListTask);