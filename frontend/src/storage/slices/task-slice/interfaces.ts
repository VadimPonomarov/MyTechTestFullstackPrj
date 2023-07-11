export interface ITask{
    id?: number | null
    name: string
    dateStart: Date | undefined
    dateEnd: Date | undefined
    categoryId?: number | undefined
    description?: string,
}

export interface IInitialState {
    isModal: boolean
    isSubmit: boolean | undefined;
    tasks: ITask[]
    currentTask: ITask

}