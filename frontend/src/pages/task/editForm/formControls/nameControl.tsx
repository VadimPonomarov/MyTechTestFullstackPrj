import React, {FC, memo} from 'react';

import {Box, Container, TextField} from "@mui/material";
import Button from "@mui/material/Button";

import {IFormProps} from "./interfaces";
import {useAppSelector} from "../../../../storage";
import css from "../formControls/index.module.scss";


const _NameControl: FC<IFormProps> = (props) => {
    const {register, errors, label} = props
    const {currentTask: {name}} = useAppSelector(state => state.task)
    return (
        <>
            <TextField
                required
                defaultValue={name}
                className={css.input}
                label={"Name"}
                variant="standard"
                {...register("name", {required: true})}
            />
            <Container className={css.error}>
                {errors?.name && `${errors?.name?.message}`}
            </Container>
            <Box style={{visibility: "hidden"}}>
                <Button id={'submitButton'} className={css.button}
                        variant="outlined" type="submit">Submit</Button>
            </Box>
        </>
    );
};

export const NameControl = memo(_NameControl);