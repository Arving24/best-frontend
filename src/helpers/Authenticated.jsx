import { redirect, Outlet } from "react-router-dom";


export const loginValidator = () => {
    const localStorageToken = localStorage.getItem("t");

    return localStorageToken ? redirect('/dashboard') : <Outlet />;
}
