import React, {FC, memo} from 'react';

import {Box, Container, Input, InputLabel} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import dayjs from "dayjs";

import css from './index.module.scss'
import {IFormProps} from "./interfaces";
import {useAppSelector} from "../../../../storage";


const _DateEndControl: FC<IFormProps> = (props) => {
    const {register, errors, label} = props
    const {currentTask: {dateEnd}} = useAppSelector(state => state.task)
    return (
        <>
            <Box className={css.dateBox}>
                <InputLabel><small>{label}</small></InputLabel>
                <FormControl sx={{
                    width: "100%",
                }}>
                    <Input
                        type={'date'}
                        defaultValue={dayjs(dateEnd).format("YYYY-MM-DD")}

                        {...register("dateEnd", {
                            required: {
                                value: true,
                                message: 'Required'
                            }
                        })}
                    />
                </FormControl>
            </Box>
            <Container className={css.error}>
                {errors?.dateEnd && `${errors?.dateEnd?.message}`}
            </Container>
        </>

    );
};

export const DateEndControl = memo(_DateEndControl)