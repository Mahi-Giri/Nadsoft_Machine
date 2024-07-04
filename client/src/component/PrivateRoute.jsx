import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = () => {
    const { currentUser } = useSelector((store) => store.user);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        }
    }, [currentUser]);

    const userFromStorage = JSON.parse(localStorage.getItem("user"));

    return userFromStorage ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
