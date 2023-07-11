import {FieldErrors, UseFormRegister} from "react-hook-form";

import {ICategory} from "../../../../storage/slices/category-slice/interfaces";

export interface IFormProps {
    label?: string,
    register: UseFormRegister<ICategory>,
    errors: FieldErrors<ICategory>
}