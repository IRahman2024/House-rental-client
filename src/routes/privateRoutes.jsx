import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {

    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location.pathname);
    

    if(loader){
        return <span className="loading loading-spinner loading-md"></span>
    }

    if(user){
        return children;
    }

    return <Navigate state={location.pathname} to ='/login'></Navigate>;
};

export default PrivateRoutes;