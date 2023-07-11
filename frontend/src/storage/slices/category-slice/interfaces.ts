import {ITask} from "../task-slice/interfaces";

export interface ITaskCountInfo {
    tasks: number
}
export interface ITaskCount {
    _count?: ITaskCountInfo
}
export interface IUser {
    id?: number;
    email: string;
}

export interface ICategory extends ITaskCount{
    id?: number;
    name: string;
    dateCreated?: Date;
    user?: IUser;
    userId?: number;
    tasks?: ITask[]
}

export interface IInitialState {
    isSubmit: boolean | undefined;
    currentCategory: ICategory;
    categories: ICategory[];
}