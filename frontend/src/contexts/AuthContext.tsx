import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

import { Library, User } from "../types";

type AuthContextType = {
    user: User | undefined;
    loading: boolean;
    library: Library | undefined;
    setLibrary: React.Dispatch<React.SetStateAction<Library | undefined>>;
    fetchLibrary: () => void;
};

type AuthContextProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [library, setLibrary] = useState<Library | undefined>(undefined);

    const validateToken = async () => {
        const baseURL = process.env.REACT_APP_SERVER_URL ?? "";
        const headers = { "Content-Type": "application/json" };

        try {
            const token = Cookies.get(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "");
            if (!token) {
                setLoading(false);
                return;
            }
            
            const res = await fetch(`${baseURL}/userByToken/${token}`, {
                method: "GET",
                headers,
            });

            if (!res.ok) throw new Error('Failed to fetch user');

            const user = await res.json() as User[];
            if (!user[0]) Cookies.remove(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "");
            setUser(user[0]);
        } catch (error) {
            console.error('Authentication error:', error);
            throw new Error('Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const fetchLibrary = async () => {
        if (!user || loading) return;

        const baseURL = process.env.REACT_APP_SERVER_URL ?? "";
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        };

        try {
            const res = await fetch(`${baseURL}/library/${user.id}`, {
                method: "GET",
                headers,
            });

            if (!res.ok) throw new Error('Failed to fetch library');
    
            const library = await res.json() as Library;
            setLibrary(library);
        } catch (error) {
            console.error('Library fetch error:', error);
            throw new Error('Library fetch failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, library, setLibrary, fetchLibrary }}>
            { children }
        </AuthContext.Provider>
    );
};

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
