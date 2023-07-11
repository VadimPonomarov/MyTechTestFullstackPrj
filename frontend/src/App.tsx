import React from 'react';

import {Outlet} from 'react-router-dom';

import 'normalize.css';

import {RoutesMain} from './routes';

function App() {
    return (
        <>
            <RoutesMain/>
            <Outlet/>
        </>
    )
}

export default App;
