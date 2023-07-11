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
import {setCategoryCurrentEmpty} from "../../../storage/slices/category-slice/categorySlice";


const _YesNoDialog = (props: { data: IProps }) => {
    const {dialogTitle, openButtonTitle, form, formSelector, contentText, openButtonId} = props.data
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const {isSubmit, currentCategory: {id}} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isSubmit) setOpen(false);
    }, [isSubmit])

    const handleClickYes = () => {
        if (form) {
            const submitFormButton = document.querySelector(
                `${formSelector} #submitButton`
            ) as HTMLElement
            submitFormButton?.click()
        }
    };

    const handleClickNo = () => {
        dispatch(setCategoryCurrentEmpty())
        setOpen(false);
    };

    const dialogActionsData: IDialogActionsButton[] = [
        {name: 'YES', onClick: handleClickYes, variant: 'outlined'},
        {name: 'NO', onClick: handleClickNo, variant: 'outlined'}
    ]

    return (
        <>
            <Button id={openButtonId} variant="outlined" onClick={() => setOpen(true)}>
                {openButtonTitle}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => handleClickNo()}
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

export const YesNoDialog = memo(_YesNoDialog);