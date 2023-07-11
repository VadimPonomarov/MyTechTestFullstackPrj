import React, {FC, memo} from 'react';

import {Box, Container, TextField} from "@mui/material";
import Button from "@mui/material/Button";

import {IFormProps} from "./interfaces";
import {useAppSelector} from "../../../../storage";
import css from "../index.module.scss";


const _NameControl: FC<IFormProps> = (props) => {
    const {currentCategory: {id, name}} = useAppSelector(state => state.category)
    const {register, errors} = props
    const handleOnChange = (e:any) => {

    }

    return (
        <>
            <TextField
                required
                className={css.input}
                defaultValue={name}
                label={'Name'}
                variant="standard"
                {...register("name", {required: true})}
            />
            <Container className={css.error}>
                {errors?.name && `${errors?.name?.message}`}
            </Container>
        </>
    );
};

export const NameControl = memo(_NameControl);