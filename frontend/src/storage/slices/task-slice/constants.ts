import {IInitialState, ITask} from "./interfaces";

export const initialTask: ITask = {
    id: null,
    name: '',
    categoryId: undefined,
    dateEnd: undefined,
    dateStart: undefined,
    description: '',
}

export const initialState: IInitialState = {
    isModal: false,
    tasks: [],
    isSubmit: false,
    currentTask: initialTask
}