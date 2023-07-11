import React from 'react';

import {Box, Container, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {motion} from "framer-motion";
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";

import {login, useAppDispatch } from "../../../storage";
import {ILoginInputs} from "../../../storage/slices/auth-slice/interfaces";
import css from "../index.module.scss";


export const Login = () => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset, formState: {errors, isValid}} =
        useForm<ILoginInputs>({
            mode: 'onChange',
        });

    const onSubmit = async (body: ILoginInputs) => {
        try {
            await dispatch(login(body))
            navigate('/categories')
        } catch (e) {
            const empty: ILoginInputs = {email: '', password: ''}
            reset(empty)
        }
    };

    return (
        <Box className={css.main}>
            <motion.form
                animate={{
                    scale: [1, 1.3, 1.3, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                }}
                transition={{duration: 2}}
                className={css.form}
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className={css.container}>Login form</h2>
                <TextField
                    required
                    className={css.input}
                    label="Email"
                    defaultValue={process.env.ADMIN_LOGIN || ''}
                    variant="standard"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
                            message: "Should be an email address"
                        }
                    })}
                />
                <Container className={css.error}>
                    {errors?.email && `${errors?.email?.message}`}
                </Container>
                <TextField
                    required
                    className={css.input}
                    type="password"
                    label="Password"
                    defaultValue={process.env.ADMIN_PASSWORD || ''}
                    variant="standard"
                    {...register("password", {
                        required: true,
                        minLength: {
                            value: 5,
                            message: "Should be at least 5 symbols"
                        },
                        maxLength: {
                            value: 8,
                            message: "Should be max 8 symbols"
                        },
                    })}
                />
                <Container className={css.error}>
                    {errors?.password && `${errors?.password?.message}`}
                </Container>
                <Container className={[css.input, css.container, css.textCenter].join(' ')}>
                    <Button className={css.button} disabled={!isValid} variant="outlined" type="submit">Submit</Button>
                </Container>
                <Container className={css.textCenter}>
                    <small><NavLink to={'/registration'}>Registration form</NavLink></small>
                </Container>
            </motion.form>
        </Box>
    );
};
