import React, {FC, memo} from 'react';

import {Route, Routes} from "react-router-dom";

import {PrivateRoute} from "./privateRoute";
import {MainLayout} from '../layouts';
import {ListCategory, ListTask, Login, Registration} from '../pages';


export const RoutesMain = () => {

    return (
        <>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route path={'registration'} element={<Registration/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'categories'} element={<PrivateRoute><ListCategory/></PrivateRoute>}/>
                    <Route path={'tasks'} element={<PrivateRoute><ListTask/></PrivateRoute>}/>
                </Route>
            </Routes>
        </>
    );
};
