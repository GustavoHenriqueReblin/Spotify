import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

import { Playlist } from "../types";

type PlaylistContextType = {
    playlist: Playlist | undefined;
    findPlaylist: (id: number) => Promise<Playlist>;
    loading: boolean;
};

type PlaylistContextProps = {
    children: ReactNode;
};

export const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: PlaylistContextProps) => {
    const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const findPlaylist = async (id: number) => {
        try {
            setLoading(true);
            const token = Cookies.get(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "");

            const res = await fetch((process.env.REACT_APP_SERVER_URL ?? "") + "/playlist/" + id, {
                method: "get",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            const playlist = await res.json();
            setPlaylist(playlist[0]);
            console.log(playlist[0]);
            
            return playlist[0];
        } catch (error) {
            console.error('Playlist find error:', error);
            throw new Error('Playlist find failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PlaylistContext.Provider value={{ findPlaylist, playlist, loading }}>
            { children }
        </PlaylistContext.Provider>
    );
};

export function usePlaylistContext() {
    const context = useContext(PlaylistContext);
    if (context === undefined) {
        throw new Error('usePlaylistContext must be used within an PlaylistProvider');
    }
    return context;
}
