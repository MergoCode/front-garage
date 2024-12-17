import React from "react";
import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="layoutContainer">
            <Header />
                <main className="layoutContainer__content"> <Outlet /></main>
            <Footer />
        </div>
    );

};

export default  Layout;