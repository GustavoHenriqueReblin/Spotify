import React from "react";
import { Navigate } from 'react-router-dom';

import { useAuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Main: React.FC = () => {
    const { user, loading } = useAuthContext();

    if (loading) return <Loading />;

    if (!user) return <Navigate to={"/login"} />;

    return (
        <>
            <main className="w-full h-screen">
                <NavBar user={user} />
                <section></section>
            </main>
            <Footer user={user} />
        </>
    );
}

export default Main;
