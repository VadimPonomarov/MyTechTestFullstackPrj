import {FieldErrors, UseFormRegister} from "react-hook-form";

import {ITask} from "../../../../storage/slices/task-slice/interfaces";

export interface IFormProps{
    label?: string,
    register: UseFormRegister<ITask>,
    errors: FieldErrors<ITask>
}