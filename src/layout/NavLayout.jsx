import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const NavLayout = ({ title }) => {
    return (
        <>
            <Header title={title} />
            <Outlet />
            <Navbar />
        </>
    );
};

export default NavLayout;
