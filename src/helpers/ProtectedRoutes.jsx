import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	// TODO: Use authentication token
	const localStorageToken = localStorage.getItem("t");

	return localStorageToken ? <Outlet /> : <Navigate to="/"  replace />;
}

export default ProtectedRoutes
