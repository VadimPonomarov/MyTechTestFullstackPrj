import * as React from 'react';
import {memo, useCallback, useMemo} from 'react';

import {Category, Task} from "@mui/icons-material";
import {
    AppBar, Avatar,
    Box,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Switch,
    Toolbar,
} from '@mui/material';
import {useLocation, useNavigate} from "react-router-dom";

import {setAuth, useAppDispatch, useAppSelector} from "../../../storage";

const _MyAppBar = () => {
    const {isAuth} = useAppSelector(state => state.auth)
    const {currentCategory: {id: categoryId}} = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            dispatch(setAuth(false))
            localStorage.removeItem('tokenPair')
            navigate('/login')
        } else {
            navigate('/login')
        }
    };
    const isLoginPage = useMemo(() => !!location.pathname.match(/login/), [location.pathname])

    return (
        <Box sx={{flexGrow: 1}}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={!!isAuth }
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={isAuth ? 'Logout' : 'Login'}
                />
            </FormGroup>
            <AppBar position="static">
                <Toolbar>
                    <Box display={"flex"}>
                        <MenuItem onClick={() => navigate('/categories')}>
                            <Category/> Categories
                        </MenuItem>
                        <MenuItem disabled={!categoryId} onClick={() => navigate('/tasks')}>
                            <Task/> Tasks
                        </MenuItem>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export const MyAppBar = memo(_MyAppBar);