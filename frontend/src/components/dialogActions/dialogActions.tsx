import React, {memo} from 'react';


import Button from '@mui/material/Button';
import DialogActions from "@mui/material/DialogActions";
import {v4} from 'uuid'

import css from "../../pages/category/yesNoDialog/index.module.scss";
import {IDialogActionsButton as IProps} from "../dialogActions/interfaces";


const _MyDialogActions = (props: { data: IProps[] }) => {
    return (
        <DialogActions className={css.create_edit_dialog_actions}>
            {props.data.map(item => (
                <Button
                    key={v4()}
                    autoFocus={item.autofocus as boolean | undefined}
                    onClick={() => item.onClick()}
                    variant={item.variant as "text" | "outlined" | "contained" | undefined}
                >
                    {item.name}
                </Button>
            ))}
        </DialogActions>
    );
}; 

export const MyDialogActions = memo(_MyDialogActions);