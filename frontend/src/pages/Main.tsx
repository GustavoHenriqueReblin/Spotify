import React, { Fragment } from "react";
import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../contexts/AuthContext";

const Main: React.FC = () => {
    const user = useAuthContext();
    if (!user?.user) return (<Navigate to={"/login"} />);

    return (
        <Fragment>
            <h2>Main Page</h2>
        </Fragment>
    );
}

export default Main;