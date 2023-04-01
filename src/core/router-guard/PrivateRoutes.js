import { isLoggedIn } from "../auth/Auth";

const { Outlet, Navigate } = require("react-router-dom");

const PrivateRoutes = () => {
    return (
        isLoggedIn() ? <Outlet/> : <Navigate to="/Login"/>
    )
}

export default PrivateRoutes;