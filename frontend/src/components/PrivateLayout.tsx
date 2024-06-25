import React, { Fragment, ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";

interface PrivateLayoutProps {
    children?: ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
    const { user, loading } = useAuthContext();

    if (loading) return <Loading />;
    if (!user) return <Navigate to={"/login"} />;

    return (
        <Fragment>
            <main className="w-full h-screen flex">
                <NavBar user={user} userLoading={loading} />
                { children }
            </main>
            { user.idLastMusic || true && <Footer /> } 
        </Fragment>
    );
}

export default PrivateLayout;
