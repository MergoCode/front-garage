import Header from "./Header"
import Footer from "./Footer.tsx"
import { Outlet } from "react-router-dom";
import "../css/Layout.css";

const Layout = () => {
    

    return (
        <div className="layoutContainer">
            <Header />
                <main className="layout-content"> <Outlet /></main>
            <Footer />
        </div>
    );

};

export default  Layout;