import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

export default function Layout() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
}