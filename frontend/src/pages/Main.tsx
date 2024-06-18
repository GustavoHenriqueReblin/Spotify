import React from "react";
import { Navigate } from 'react-router-dom';

import { useAuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";
import NavBar from "../components/NavBar";

const Main: React.FC = () => {
    const { user, loading } = useAuthContext();

    if (loading) return <Loading />;

    if (!user) return <Navigate to={"/login"} />;

    return (
        <>
            <main className="w-full h-screen">
                <NavBar />
                <section></section>
            </main>
            <footer className="w-full h-28 max-h-28 bg-zinc-700 absolute bottom-0"></footer>
        </>
    );
}

export default Main;
