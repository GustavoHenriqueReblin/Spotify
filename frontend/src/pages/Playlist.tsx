import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { Playlist as PlaylistType } from "../types";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Playlist: React.FC = () => {
    const [playlist, setPlaylist] = useState<PlaylistType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const playlistId = useSelector((state: any) => state.playlistId.value);

    useEffect(() => {
        if (!playlistId) navigate("/");
        
        if (playlistId !== undefined) {
            const getPlaylistData = async () => {
                try {
                    const token = Cookies.get(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "");
                    const res = await fetch((process.env.REACT_APP_SERVER_URL ?? "") + "/playlist/" + playlistId, {
                        method: "GET",
                        headers: { 
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });

                    const playlistData = await res.json();
                    setPlaylist(playlistData[0]);
                } catch (error) {
                    console.error('Playlist find error:', error);
                    throw new Error('Playlist find failed');
                } finally {
                    setLoading(false);
                }
            };

            getPlaylistData();
        }
    }, [playlistId, loading, navigate, playlist]);

    return (
        <section className="w-[calc(100%-20rem)] h-full overflow-y-auto">
            <div className="h-fit w-full p-6 bg-zinc-700">
                <div className="h-12 w-full flex items-center gap-2">
                    <div className="flex-grow flex items-center gap-2">
                        <IoChevronBack className="text-2xl cursor-pointer hover:scale-105" />
                        <IoChevronForward className="text-2xl cursor-pointer hover:scale-105" />
                    </div>
                    <div className="bg-white rounded-full font-bold text-zinc-950 text-sm px-4 py-2 cursor-pointer hover:scale-105">Explorar o premium</div>
                    <div className="bg-zinc-950 rounded-full font-bold text-white text-sm px-4 py-2 cursor-pointer hover:scale-105">Instalar o app</div>
                    <div className="rounded-full p-2 bg-zinc-800 cursor-pointer hover:scale-105">
                        <IoMdNotificationsOutline className="text-xl" />
                    </div>
                    <div className="rounded-full p-1 bg-zinc-800 cursor-pointer hover:scale-105">
                        <div className="h-8 w-8 bg-zinc-900 rounded-full"></div>
                    </div>
                </div>
                <h2 className="text-sm my-1">Playlist</h2>
                <h2 className="text-7xl font-bold my-4">{ loading ? "" : playlist?.name }</h2>
                <div className="flex gap-3 items-center">
                    <div className="h-8 w-8 bg-zinc-900 rounded-full"></div>
                    <span className="hover:underline font-semibold cursor-pointer">{loading ? "---" : playlist?.userName}</span>
                    <span className="">*</span>
                    <span className="">2 likes</span>
                    <span className="">*</span>
                    <span className="">3 músicas, aproximadamente 1 hora</span>
                </div>
            </div>
        </section>
    );
}

export default Playlist;
