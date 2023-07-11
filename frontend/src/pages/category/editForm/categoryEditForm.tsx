import React, {memo} from 'react';

import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";

import {NameControl} from './formControls/nameControl';
import css from "./index.module.scss";
import {useAppDispatch, useAppSelector} from "../../../storage";
import {
    createCategory, setCategoryCurrentEmpty,
    setSubmit, updateCategory
} from "../../../storage/slices/category-slice/categorySlice";
import {ICategory} from "../../../storage/slices/category-slice/interfaces";

const _CategoryEditForm = () => {
    const dispatch = useAppDispatch()
    const {
        isSubmit,
        currentCategory: {
            id: categoryId
        }
    } = useAppSelector(state => state.category)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
        getValues
    } =
        useForm<ICategory>({
            mode: 'onChange',
        });
    const onSubmit = (body: ICategory) => {
        if (categoryId) {
            dispatch(updateCategory({id: categoryId, data: body}))
        } else {
            dispatch(createCategory(body))
        }
        dispatch(setSubmit(true))
        setTimeout(() => {
            dispatch(setSubmit())
            dispatch(setCategoryCurrentEmpty())
        }, 1000)
        // navigate()
    };

    return (
        <Box className={css.main_box}>
            <form
                id='categoryForm'
                className={css.form}
                onSubmit={handleSubmit(onSubmit)}>
                <NameControl
                    register={register}
                    errors={errors}
                    label={
                        !!categoryId ?
                            'Edit category form' :
                            'Add category form'
                    }/>
                <Box style={{visibility: "hidden"}}>
                    <Button id={'submitButton'} className={css.button}
                            variant="outlined" type="submit">Submit</Button>
                </Box>
            </form>
        </Box>
    );
};

export const CategoryEditForm = memo(_CategoryEditForm);