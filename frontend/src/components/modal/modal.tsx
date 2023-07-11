import * as React from 'react';
import {memo, useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import css from './index.module.scss'
import {IProps} from "./interfaces";
import {useAppDispatch, useAppSelector} from "../../storage";
import {deleteTask, setModal} from '../../storage/slices/task-slice/taskSlice';
import {MyDialogActions} from "../dialogActions/dialogActions";
import {IDialogActionsButton} from "../dialogActions/interfaces";


const _MountedModal = (props: IProps) => {

    const defaultTitle: string = 'Do you want to delete this item ?'
    const {taskId, title = defaultTitle, contentText} = props
    const [open, setOpen] = useState(false)
    const {isModal} = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setOpen(isModal)
    }, [isModal])
    const handleClickNo = () => {
        dispatch(setModal(false))
    };
    const handleClickYes = () => {
        if (taskId)
            dispatch(deleteTask(taskId))
        dispatch(setModal(false))
    };
    const data: IDialogActionsButton[] = [
        {name: 'No', onClick: handleClickNo, variant: 'outlined'},
        {name: 'Yes', onClick: handleClickYes, variant: 'outlined'}
    ]

    return (
        <div>
            <Modal
                keepMounted
                open={open}
            >
                <Box
                    className={css.style}
                >
                    <Typography variant="h6" component="h2">
                        {!!title && title}
                    </Typography>
                    <Typography sx={{mt: 2}}>
                        {!!contentText && contentText}
                    </Typography>
                    <MyDialogActions data={data}/>
                </Box>
            </Modal>
        </div>
    );
}

export const MountedModal = memo(_MountedModal)