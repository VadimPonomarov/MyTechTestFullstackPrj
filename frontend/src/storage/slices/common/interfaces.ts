import {AlertMessageEnum, AlertTypeEnum} from "./constants";

export interface IAlertInfo {
    type: AlertTypeEnum | string;
    message: AlertMessageEnum | string;
}

export interface IInitialState {
    isAlert: boolean;
    alertInfo: IAlertInfo;
    isPending: boolean;
}