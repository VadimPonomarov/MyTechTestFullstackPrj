import React, {FC, memo, ReactNode} from 'react';

import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {Navigate} from "react-router-dom";

import {useAppSelector} from "../storage";

interface IProps {
    children: ReactJSXElement
}

export const PrivateRoute = ({children}: IProps) => {
    const {isAuth} = useAppSelector(state => state.auth);
    return (isAuth ? children : <Navigate to={"/login"} replace/>);
};

