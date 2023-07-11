import React, {FC, memo} from 'react';

import {Box, Container, Input, InputLabel, TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import dayjs from "dayjs";

import css from './index.module.scss'
import {IFormProps} from "./interfaces";
import {useAppSelector} from "../../../../storage";


const _DateStartControl: FC<IFormProps> = (props) => {
    const {register, errors, label} = props
    const {currentTask: {dateStart}} = useAppSelector(state => state.task)
    return (
        <>
            <Box className={css.dateBox}>
                <InputLabel><small>{label}</small></InputLabel>
                <FormControl sx={{
                    width: "100%",
                }}>
                    <Input
                        defaultValue={dayjs(dateStart).format("YYYY-MM-DD")}
                        type={'date'}

                        {...register("dateStart", {
                            required: {
                                value: true,
                                message: 'Required'
                            }
                        })}
                    />
                </FormControl>
            </Box>
            <Container className={css.error}>
                {errors?.dateStart && `${errors?.dateStart?.message}`}
            </Container>
        </>

    );
};

export const DateStartControl = memo(_DateStartControl)