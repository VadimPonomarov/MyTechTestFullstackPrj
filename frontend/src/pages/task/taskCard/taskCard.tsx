import React, {memo, useState} from 'react';


import {CardContent, Typography} from "@mui/material";
import Card from '@mui/material/Card/Card';

import css from './index.module.scss'
import {IProps} from "./interfaces";
import {MountedModal, MyDialogActions} from "../../../components";
import {IDialogActionsButton} from "../../../components/dialogActions/interfaces";
import {useAppDispatch, useAppSelector} from "../../../storage";
import {
    deleteTaskById,
    setCurrentTaskById,
    setCurrentTaskEmpty, setModal
} from "../../../storage/slices/task-slice/taskSlice";

const _TaskCard = (props: { data: IProps }) => {
    const {dialogTitle, contentText, taskId} = props.data
    const {currentCategory: {id}} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()

    const handleEdit = () => {
        const addTaskButton = document.querySelector(
            `#openButtonFormEditTask`
        ) as HTMLElement
        if (taskId) {
            dispatch(setCurrentTaskById(taskId))
            addTaskButton?.click()
        }
    };

    const handleSetModalOpen = () => {
        dispatch(setModal(true))
    }

    const deleteCb = () => {
        if (taskId)
            dispatch(deleteTaskById(taskId))
        dispatch(setCurrentTaskEmpty())
    }
    const handleDelete = () => {
        dispatch(setModal(true))
    };

    const dialogActionsData: IDialogActionsButton[] = [
        {name: 'DELETE', onClick: handleSetModalOpen, variant: 'outlined'},
        {name: 'EDIT', onClick: handleEdit, variant: 'outlined'}
    ]

    return (
        <>
            <Card className={css.main_box}>
                <Typography>
                    {dialogTitle}
                </Typography>
                {<CardContent>
                    <Typography>
                        {contentText}
                    </Typography>
                </CardContent>}
                <MyDialogActions data={dialogActionsData}/>
            </Card>
            <MountedModal taskId={taskId}/>
        </>
    );
};

export const TaskCard = memo(_TaskCard)