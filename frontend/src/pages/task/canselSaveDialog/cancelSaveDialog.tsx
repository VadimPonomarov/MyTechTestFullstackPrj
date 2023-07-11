import React, {memo, useEffect} from 'react';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import css from "./index.module.scss";
import {IProps} from "./interfaces";
import {MyDialogActions} from "../../../components";
import {IDialogActionsButton} from "../../../components/dialogActions/interfaces";
import {useAppDispatch, useAppSelector} from "../../../storage";
import {setCurrentTaskEmpty} from "../../../storage/slices/task-slice/taskSlice";


const _CancelSaveDialog = (props: { data: IProps }) => {
    const {dialogTitle, openButtonTitle, form, formSelector, contentText, openButtonId} = props.data
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const {isSubmit, currentCategory: {id}} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()


    const handleClickSave = () => {
        if (form) {
            const submitFormButton = document.querySelector(
                `${formSelector} #submitButton`
            ) as HTMLElement
            submitFormButton?.click()
        }
        dispatch(setCurrentTaskEmpty())
        setOpen(false)
    };

    const handleClickCancel = () => {
        dispatch(setCurrentTaskEmpty())
        setOpen(false);
    };

    const dialogActionsData: IDialogActionsButton[] = [
        {name: 'CANCEL', onClick: handleClickCancel, variant: 'outlined'},
        {name: 'SAVE', onClick: handleClickSave, variant: 'outlined'}
    ]

    return (
        <>
            <Button id={openButtonId} variant="outlined" onClick={() => setOpen(true)}>
                {openButtonTitle}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => handleClickCancel()}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                {<DialogContent className={css.dialog_box}>
                    <DialogContentText>
                        {contentText}
                    </DialogContentText>
                    <Box>
                        {form}
                    </Box>
                </DialogContent>}
                <MyDialogActions data={dialogActionsData}/>
            </Dialog>
        </>
    );
};

export const CancelSaveDialog = memo(_CancelSaveDialog);