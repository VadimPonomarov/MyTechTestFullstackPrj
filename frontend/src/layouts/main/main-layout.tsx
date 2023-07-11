import {FC, useEffect} from 'react';


import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useEffectOnce} from "usehooks-ts";

import {MyAppBar} from '..';
import {AlertInfo} from '../../components';
import {
    clearAlert,
    clearPending,
    useAppDispatch,
    useAppSelector
} from "../../storage";
import css from '../main/index.module.scss'


export const MainLayout: FC = () => {
    const {isPending, isAlert} = useAppSelector(state => state.common);
    const {isAuth} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffectOnce(() => {
        if (isPending) dispatch(clearPending())
        if (isAlert) dispatch(clearAlert())

        if (!isAuth) {
            navigate('/login')
        }
    })

    return (
        <Box className={css.layout_main_box}>
            <MyAppBar/>
            {isPending && <LinearProgress/>}
            {isAlert && <AlertInfo/>}
            <Outlet/>
        </Box>
    );
};
