import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultOutlet = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default DefaultOutlet;
