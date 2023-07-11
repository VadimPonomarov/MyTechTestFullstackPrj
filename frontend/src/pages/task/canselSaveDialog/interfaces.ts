import {ReactNode} from "react";

export interface IProps {
    openButtonId: string
    openButtonTitle?: string | undefined;
    dialogTitle?: string | undefined;
    contentText?: string | undefined
    form?: ReactNode | undefined
    formSelector: string
}