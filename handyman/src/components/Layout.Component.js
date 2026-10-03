import { Outlet } from "react-router-dom"
import NavbarComponent from "./Navbar.Component"

function Layout() {
    return (
        <>
            <NavbarComponent />
            <Outlet />
        </>
    );
}

export default Layout;