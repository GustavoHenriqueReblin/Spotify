import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Music, Playlist as PlaylistType } from "../types";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Header from "../components/Header";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { LuClock } from "react-icons/lu";
import { FaPlay } from "react-icons/fa";
import { setIsRunning } from "../store/playistSlice";
import { setIsRunning as setMusicIsRunning } from "../store/musicSlice";
import { formatDate, formatTime } from "../utils";
import { setCurrentIndex, setPlaylistIsRunningId, setMusics as setPlaylistMusics } from "../store/persisted/persistedPlayistSlice";
import { setAudio, setSeconds } from "../store/persisted/persistedMusicSlice";
import Button from "../components/Button";

const Playlist: React.FC = () => {
    const { playlistId, currentIndex, playlistIsRunningId } = useSelector((state: any) => state.global.persistedPlaylist);
    const { isRunning } = useSelector((state: any) => state.global.playlist);
    const { isRunning: musicIsRunning } = useSelector((state: any) => state.global.music);
    const { audio: musicAudio } = useSelector((state: any) => state.global.persistedMusic);

    const [playlist, setPlaylist] = useState<PlaylistType | undefined>(undefined);
    const [musics, setMusics] = useState<Music[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkPlaylistData = () => {
        if (!loading && !playlist) navigate("/");
    };

    const fetchPlaylist = async () => {
        if (!playlistId) return;

        const baseURL = process.env.REACT_APP_SERVER_URL ?? "";
        const token = Cookies.get(process.env.REACT_APP_AUTH_COOKIE_NAME ?? "");
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const playlistRes = await fetch(`${baseURL}/playlist/${playlistId}`, {
                method: "GET",
                headers,
            });

            if (!playlistRes.ok) throw new Error('Failed to fetch playlist');

            const playlistData = await playlistRes.json() as PlaylistType[];
            setPlaylist(playlistData[0]);

            const musicsRes = await fetch(`${baseURL}/playlist/${playlistId}/musics`, {
                method: "GET",
                headers,
            });

            if (!musicsRes.ok) throw new Error('Failed to fetch playlist');

            const musicsData = await musicsRes.json() as Music[];
            setMusics(musicsData);
            dispatch(setPlaylistMusics(musicsData));
        } catch (error) {
            console.error('Playlist fetch error:', error);
            throw new Error('Playlist fetch failed');
        } finally {
            setLoading(false);
        }
    };

    const playPausePlaylist = () => {
        // Mudou playlist
        if (playlist && musics && musics.length > 0 && playlistIsRunningId != playlist.id) {
            dispatch(setPlaylistIsRunningId(playlist.id));
            dispatch(setCurrentIndex(0));
            dispatch(setAudio(musics[0]));
            dispatch(setSeconds(0));
            dispatch(setIsRunning(true));
            dispatch(setMusicIsRunning(true));
        } else {
            dispatch(setIsRunning(!isRunning));
            dispatch(setMusicIsRunning(!musicIsRunning));
        }
    };

    useEffect(() => {
        fetchPlaylist();
    }, [playlistId]);

    useEffect(() => {
        checkPlaylistData();
    }, [loading]);

    return (
        <>
            <div className="h-fit w-full p-6 py-2">
                <div className="flex gap-6 items-center">
                    <div className="h-36 w-36 bg-zinc-200 rounded-md">
                        <img alt="Playlist logo" src={loading || !playlist?.picture ? require('../assets/img-background.jpg') : playlist?.picture} className="h-full w-full object-cover"></img>
                    </div>
                    <div className="w-auto max-w-[calc(100%-12rem)] text-sm">
                        <h2>Playlist</h2>
                        <h2 className="h-fit text-7xl whitespace-nowrap overflow-hidden text-ellipsis font-bold pb-4">{ loading ? "" : playlist?.name }</h2>
                        <div className="flex gap-3 items-center">
                            <div className="h-8 w-8 bg-zinc-200 rounded-full"></div>
                            <span className="hover:underline font-semibold cursor-pointer">{loading ? "---" : playlist?.userName}</span>
                            <span className="">*</span>
                            <span className="">2 likes</span>
                            <span className="">*</span>
                            <span className="">3 músicas, aproximadamente 1 hora</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-fit w-full flex gap-4 p-6 items-center text-zinc-200">
                <Button
                    id={"play-pause-playlist-button"}
                    children={
                        playlistId === playlistIsRunningId ? isRunning ? <FaCirclePause className="text-5xl" /> : <FaCirclePlay className="text-5xl" /> : <FaCirclePlay className="text-5xl" />
                    }
                    onClick={() => playPausePlaylist()}
                    className="w-fit mr-2 cursor-pointer hover:scale-105 text-green-600"
                    title={`${isRunning ? "Pausar" : "Tocar"}`}
                    type={"button"}
                />
                <Button
                    id={"save-playlist-button"}
                    children={ <IoMdAddCircleOutline /> }
                    className="text-3xl cursor-pointer hover:scale-105"
                    title={"Salvar Playlist"}
                    type={"button"}
                />
                <Button
                    id={"playlist-options-button"}
                    children={ <SlOptions /> }
                    className="text-2xl cursor-pointer hover:scale-105"
                    title={"Opções"}
                    type={"button"}
                />
            </div>
            <div className="w-full h-fit px-6 text-zinc-400 text-sm font-medium">
                <div className="h-fit w-full flex gap-4 px-4 mb-4">
                    <div className="flex gap-2 w-full">
                        <span className="w-[calc(3%)]">#</span>
                        <span className="w-[calc(38%)]">Título</span>
                        <span className="w-[calc(32%)]">Álbum</span>
                        <span className="w-[calc(20%)]">Adicionada em</span>
                        <span className="w-[calc(7%)] flex items-center"><LuClock className="text-base" /></span>
                    </div>
                </div>
                { musics && musics.length > 0 ? musics.map((music: Music, i) => (
                     <div key={i} className={`h-12 w-full rounded-md px-4 hover:bg-zinc-900 flex items-center ${currentIndex === i && playlistId === playlistIsRunningId && "text-green-600"}`}>
                        <div className="flex gap-2 w-full">
                            <span className="w-[calc(3%)] flex items-center">{ false ? <FaPlay className="cursor-pointer" /> : i + 1 }</span>
                            <span className="w-[calc(38%)]">{ music.name }</span>
                            <span className="w-[calc(32%)]">{ music.albumName }</span>
                            <span className="w-[calc(20%)]">{ formatDate(music.addedAt.toString()) }</span>
                            <span className="w-[calc(7%)] flex items-center">{ formatTime(music.duration) }</span>
                        </div>
                    </div>
                )) : (
                    <div className="w-full flex items-center justify-center py-6">
                        <span className="">Nenhuma música encontrada :(</span>
                    </div>
                )}
            </div>
        </>
    );
}

export default Playlist;
