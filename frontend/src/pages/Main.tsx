import React, { Fragment } from "react";
import { Navigate } from 'react-router-dom';

import { useAuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";

const Main: React.FC = () => {
    const { user, loading } = useAuthContext();

    if (loading) return <Loading />;

    if (!user) return <Navigate to={"/login"} />;

    return (
        <Fragment>
            <h2>Main Page</h2>
        </Fragment>
    );
}

export default Main;
