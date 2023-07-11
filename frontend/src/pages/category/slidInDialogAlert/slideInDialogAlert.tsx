import * as React from 'react';
import {memo} from 'react';

import {Box} from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';

import {IProps} from "./interfaces";
import {MyDialogActions} from "../../../components";
import {IDialogActionsButton} from "../../../components/dialogActions/interfaces";
import {useAppDispatch} from "../../../storage";
import {deleteCategory} from "../../../storage/slices/category-slice/categorySlice";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const _AlertDialogSlide = (props: IProps) => {
    const {title = 'Title', dialogTitle, contentText, categoryId} = props
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch()
    const handleOnClickEdit = () => {
        setOpen(false);
        document.getElementById('openButtonFormEditCategory')?.click()
    };
    const handleOnClickDelete = () => {
        if (categoryId)
            dispatch(deleteCategory(categoryId))
        setOpen(false);
    };

    const buttonGroup: IDialogActionsButton[] = [
        {name: 'Edit', onClick: () => handleOnClickEdit(), variant: 'outlined', autofocus: true},
        {name: 'Delete', onClick: () => handleOnClickDelete(), variant: 'outlined', autofocus: false}
    ]
    const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="text" onClick={(e) => handleClickOpen(e)}>
                {title}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}

            >
                <Box display={'flex'}>
                    <DialogTitle>{dialogTitle}</DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {contentText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <MyDialogActions data={buttonGroup}/>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}

export const AlertDialogSlide = memo(_AlertDialogSlide)