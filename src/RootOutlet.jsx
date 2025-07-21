import React from 'react';
import { Outlet } from 'react-router-dom';

const RootOutlet = () => {
    return (
        <>
            {/* <LayOut> */}
                <Outlet />
            {/* </LayOut> */}
        </>
    );
};

export default RootOutlet;
