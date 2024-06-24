import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Music, Playlist as PlaylistType } from "../types";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Header from "../components/Header";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { setIsRunning } from "../store/musicSlice";

const Playlist: React.FC = () => {
    const [playlist, setPlaylist] = useState<PlaylistType | undefined>(undefined);
    const [musics, setMusics] = useState<Music[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const { isRunning  } = useSelector((state: any) => state.global.music);
    const { playlistId  } = useSelector((state: any) => state.global.playlist);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getPlaylistData = async () => {
                try {
                    if (playlistId !== undefined) {
                        const baseURL = process.env.REACT_APP_SERVER_URL ?? "";
                        const token = Cookies.get(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "");

                        const playlistRes = await fetch(`${baseURL}/playlist/${playlistId}`, {
                            method: "GET",
                            headers: { 
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                        });

                        const playlistData = await playlistRes.json();
                        setPlaylist(playlistData[0]);

                        const musicsRes = await fetch(`${baseURL}/playlist/${playlistId}/musics`, {
                            method: "GET",
                            headers: { 
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                        });

                        const musicsData = await musicsRes.json();
                        console.log(musicsData);
                        
                        setMusics(musicsData);
                    }
                } catch (error) {
                    console.error('Playlist find error:', error);
                    throw new Error('Playlist find failed');
                } finally {
                    setLoading(false);
                }
        };

        getPlaylistData();
    }, [playlistId]);

    useEffect(() => {
        if (!loading && !playlist)  navigate("/");
    }, [loading, playlist, navigate]);

    return (
        <section className="w-[calc(100%-20rem)] h-full overflow-y-auto">
            <div className="h-fit w-full p-6 bg-zinc-700">
                <Header />
                <div className="flex gap-6 items-center mt-8">
                    <div className="h-36 w-36 bg-zinc-800">
                        <img alt="Playlist logo" src={loading || !playlist?.picture ? require('../assets/img-background.jpg') : playlist?.picture} className="h-full w-full object-cover"></img>
                    </div>
                    <div className="w-[calc(100%-11rem)]">
                        <h2 className="text-sm">Playlist</h2>
                        <h2 className="h-fit text-7xl whitespace-nowrap overflow-hidden text-ellipsis font-bold pb-4">{ loading ? "" : playlist?.name }</h2>
                        <div className="flex gap-3 items-center">
                            <div className="h-8 w-8 bg-zinc-900 rounded-full"></div>
                            <span className="hover:underline font-semibold cursor-pointer">{loading ? "---" : playlist?.userName}</span>
                            <span className="">*</span>
                            <span className="">2 likes</span>
                            <span className="">*</span>
                            <span className="">3 músicas, aproximadamente 1 hora</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-fit w-full flex gap-4 p-6 items-center text-zinc-300">
                <div title={`${isRunning ? "Pausar" : "Tocar"}`} id="play-pause-button" className="w-fit mr-2 cursor-pointer hover:scale-105 text-green-600" onClick={() => dispatch(setIsRunning(!isRunning))}>
                    { isRunning ? <FaCirclePause className="text-5xl" /> : <FaCirclePlay className="text-5xl" /> }
                </div> 
                <IoMdAddCircleOutline className="text-3xl cursor-pointer hover:scale-105" />
                <SlOptions className="text-2xl cursor-pointer hover:scale-105" />
            </div>
        </section>
    );
}

export default Playlist;
