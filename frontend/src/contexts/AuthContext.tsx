import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

import { User } from "../types";

type AuthContextType = {
    user: User | undefined;
    loading: boolean;
};

type AuthContextProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const validateToken = async () => {
        try {
            const token = Cookies.get(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "");
            if (!token) {
                setLoading(false);
                return;
            }

            const res = await fetch((process.env.REACT_APP_SERVER_URL ?? "") + "/userByToken/" + token, {
                method: "get",
                headers: { "Content-Type": "application/json" },
            });

            const user = await res.json();
            if (!user[0]) Cookies.remove(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "");
            setUser(user[0]);
        } catch (error) {
            console.error('Authentication error:', error);
            throw new Error('Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
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
