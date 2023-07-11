import React, {FC, memo} from 'react';

import {Container, TextField} from "@mui/material";

import {IFormProps} from "./interfaces";
import {useAppSelector} from "../../../../storage";
import css from "../../../category/editForm/index.module.scss";


const _DescriptionControl: FC<IFormProps> = (props) => {
    const {register, errors, label} = props
    const {currentTask: {description}} = useAppSelector(state => state.task)
    return (
        <>
            <TextField
                required
                className={css.input}
                defaultValue={description}
                fullWidth={true}
                label={label}
                multiline={true}
                variant="standard"
                {...register("description", {required: true})}
            />
            <Container className={css.error}>
                {errors?.description && `${errors?.description?.message}`}
            </Container>
        </>
    );
};

export const DescriptionControl = memo(_DescriptionControl);