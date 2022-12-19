import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import SweetAlert from "../components/SweetAlert";
import LOCAL_STORAGE from "../services/localStorage";

const PrivateRoute = () => {
    const auth = LOCAL_STORAGE.getToken();
    if (!auth) {
        SweetAlert({ title: "Silahkan login terlebih dahulu", icon: "error", button: true, timer: 1500 });
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
