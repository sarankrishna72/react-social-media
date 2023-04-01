import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../topbar/Topbar';


const MainLayout = () => {


    return (
        <>
            <Topbar/>
            <Outlet/>
        </>
        
    )
}

export default MainLayout;