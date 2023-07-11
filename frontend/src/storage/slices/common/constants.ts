import {IInitialState} from "./interfaces";

export enum AlertTypeEnum {
    SUCCESS = 'Success',
    WARNING = 'Warning',
    ERROR = 'Error',
    INFO = 'Info'
}

export enum AlertMessageEnum {
    SUCCESS = ' 👍 ',
    FAILURE = ' 👎 '
}

export const initialState: IInitialState = {
    isAlert: false,
    alertInfo: {type: AlertTypeEnum.INFO, message: ''},
    isPending: false
}

