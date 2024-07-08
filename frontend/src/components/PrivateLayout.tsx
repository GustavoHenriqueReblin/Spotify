import React, { Fragment, ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface PrivateLayoutProps {
    children?: ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
    const { user, loading } = useAuthContext();
    const isRunning = useSelector((state: any) => state.global.music.isRunning);
    const audio = useSelector((state: any) => state.global.persistedMusic.audio);

    if (loading) return <Loading />;
    if (!user) return <Navigate to={"/login"} />;

    return (
        <Fragment>
            <main className="w-full h-screen flex">
                <NavBar user={user} userLoading={loading} />
                { children }
            </main>
            { (user.idLastMusic || isRunning || audio) && <Footer /> } 
        </Fragment>
    );
}

export default PrivateLayout;
