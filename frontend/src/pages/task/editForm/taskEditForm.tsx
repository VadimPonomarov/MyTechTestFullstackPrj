import React, {memo} from 'react';

import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";

import {DateEndControl} from "./formControls/dateEndControl";
import {DateStartControl} from "./formControls/dateStartControl";
import {DescriptionControl} from "./formControls/descriptionControl";
import {NameControl} from "./formControls/nameControl";
import {useAppDispatch, useAppSelector} from "../../../storage";
import {
    createCategory,
    setCategoryCurrentEmpty,
    updateCategory
} from "../../../storage/slices/category-slice/categorySlice";
import {ITask} from "../../../storage/slices/task-slice/interfaces";
import {clearCurrentTask, setSubmit, updateTask} from "../../../storage/slices/task-slice/taskSlice";
import {createTask} from '../../../storage/slices/task-slice/taskSlice';
import css from "../../category/editForm/index.module.scss";


const _TaskEditForm = () => {
    const dispatch = useAppDispatch()
    const {currentTask: {id: taskId}} = useAppSelector(state => state.task)
    const {currentCategory: {id: categoryId}} = useAppSelector(state => state.category)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
        getValues
    } =
        useForm<ITask>({
            mode: 'onChange',
        });
    const onSubmit = (body: ITask) => {
        if (taskId) {
            dispatch(updateTask({taskId, body}))
        } else {
            dispatch(createTask({...body, categoryId}))
        }
        dispatch(clearCurrentTask())
        // navigate()
    };

    return (
        <Box className={css.main_box}>
            <form
                id='taskForm'
                className={css.form}
                onSubmit={handleSubmit(onSubmit)}>
                <NameControl register={register} errors={errors} label={'Task form'}/>
                <DateStartControl register={register} errors={errors} label={'Start date'}/>
                <DateEndControl register={register} errors={errors} label={'End date'}/>
                <DescriptionControl register={register} errors={errors} label={'Description'}/>
                <Box style={{visibility: "hidden"}}>
                    <Button id={'submitButton'} className={css.button}
                            variant="outlined" type="submit">Submit</Button>
                </Box>
            </form>
        </Box>
    );
};

export const TaskEditForm = memo(_TaskEditForm);