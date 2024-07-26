import React, { useEffect, useRef, useState } from "react";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { TbArrowsRandom } from "react-icons/tb";
import { IoRepeat } from "react-icons/io5";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { LuVolumeX, LuVolume2, LuVolume1, LuVolume } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setIsRunning as setMusicIsRunning } from "../store/musicSlice";
import { setVolume as setMusicVolume, setSeconds as setMusicSeconds, setAudio, setRepeat as setMusicRepeat, setRandomOrder as setMusicRandomOrder } from "../store/persisted/persistedMusicSlice";
import { setIsRunning } from "../store/playistSlice";
import { formatTime } from "../utils";
import { setCurrentIndex } from "../store/persisted/persistedPlayistSlice";
import Button from "./Button";

const audio = new Audio();

const Footer: React.FC = () => {
    const { currentIndex, musics } = useSelector((state: any) => state.global.persistedPlaylist);
    const { audio: musicAudio, volume: musicVolume, seconds: musicSeconds, repeat: musicRepeat, randomOrder: musicRandomOrder } = useSelector((state: any) => state.global.persistedMusic);
    const { isRunning: musicIsRunning } = useSelector((state: any) => state.global.music);
    const { isRunning } = useSelector((state: any) => state.global.playlist);

    const [time, setTime] = useState<number>(musicSeconds == null ? 0 : musicSeconds);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [repeat, setRepeat] = useState<boolean>(musicRepeat !== null ? musicRepeat : false);
    const [randomOrder, setRandomOrder] = useState<boolean>(musicRandomOrder !== null ? musicRandomOrder : false);
    const [like, setLike] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(musicVolume == null ? 0.2 : musicVolume);
    const [muted, setMuted] = useState<boolean>(false);
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    
    const dispatch = useDispatch();

    const playPause = (forcedValue?: boolean) => {
        dispatch(setIsRunning(forcedValue ?? !isRunning));
        dispatch(setMusicIsRunning(forcedValue ?? !musicIsRunning));
    };

    const previous = () => {
        const index = currentIndex !== null ? currentIndex - 1 : 0;
        if (musics && index >= 0) {
            dispatch(setCurrentIndex(index));
            dispatch(setAudio(musics[index]));
            playPause(true);
        } else {
            dispatch(setCurrentIndex(musics.length - 1));
            dispatch(setAudio(musics[musics.length - 1]));
        }

        setTime(0);
    };

    const next = () => {
        let index = 0;
        if (currentIndex !== null) {
            if (randomOrder) {
                index = currentIndex;
                while (index === currentIndex || index < 0) {
                    index = Math.floor(Math.random() * musics.length)
                }
            } else {
                index = currentIndex + 1
            }
        }

        if (musics && index <= musics.length - 1) {
            dispatch(setCurrentIndex(index));
            dispatch(setAudio(musics[index]));
            playPause(true);
        } else {
            dispatch(setCurrentIndex(0));
            dispatch(setAudio(musics[0]));
            playPause(false);
        }

        setTime(0);
    };

    useEffect(() => {
        if (musicIsRunning) {
            if (audio.src !== musicAudio.src) {
                musicVolume == null && dispatch(setMusicVolume(volume));
                audio.volume = volume;
                musicSeconds == null && dispatch(setMusicSeconds(audio.src == "" ? time : 0));
                audio.currentTime = audio.src == "" ? time : 0;
                setTime(audio.src == "" ? time : 0);
                audio.src = musicAudio.src;
                audio.load();
            }

            audio.play();
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime >= musicAudio.duration) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null;
                        playPause(false);

                        if (repeat) {
                            setTime(0);
                            setTimeout(() => {
                                playPause(true);
                            }, 400);
                        } else {
                            setTime(0);
                            next();
                            setTimeout(() => {
                                next();
                                setTimeout(() => {
                                    playPause(true);
                                }, 400);
                            }, 100);
                        }
                    }
                    dispatch(setMusicSeconds(prevTime))
                    return prevTime + 1;
                });
            }, 1000);
        } else if (!musicIsRunning && intervalRef.current) {
            audio.pause();
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [musicIsRunning, musicAudio]);

    return (
        <footer className="w-full h-24 max-h-28 bg-black absolute bottom-0 flex text-zinc-200">
            <section className="w-[calc(30%)] flex items-center justify-start p-4">
                <div className="w-16 h-16 bg-zinc-200">
                    <img src={ musicAudio.picture }></img>
                </div>
                <div className="mx-5 flex flex-col">
                    <h3 
                        className="w-fit max-w-42 text-sm font-semibold cursor-pointer hover:underline whitespace-nowrap overflow-hidden text-ellipsis">
                            { musicAudio.name }
                    </h3>
                    <span 
                        className="w-fit max-w-42 text-xs font-light cursor-pointer hover:underline whitespace-nowrap overflow-hidden text-ellipsis">
                            Artistas
                    </span>
                </div>
                <Button 
                    id="like-button" 
                    children={ 
                        like ? (
                            <GoHeartFill
                                title="Descurtir" 
                                className="text-lg mx-2 cursor-pointer text-green-600 hover:text-green-400"
                                onClick={() => setLike(!like)} 
                            />
                        ) : (
                            <GoHeart 
                                title="Curtir" 
                                className="text-lg mx-2 cursor-pointer hover:text-white"
                                onClick={() => setLike(!like)} 
                            />
                        )
                    }
                    title="Curtir música" 
                    type="button"
                />
            </section>
            <section className="w-2/5 flex flex-col items-center justify-center p-4">
                <div className="w-full h-2/3 flex items-center justify-center gap-4 pb-2">
                    <Button 
                        id="random-order-button" 
                        children={ <TbArrowsRandom  /> }
                        className={`text-2xl cursor-pointer ${randomOrder && "text-green-600"} hover:scale-105`}
                        onClick={() => {
                            dispatch(setMusicRandomOrder(!randomOrder));
                            setRandomOrder(!randomOrder);
                        }}
                        title="Ordem aleatória" 
                        type="button"
                    />
                    <Button 
                        id="previous-music-button" 
                        children={ <MdNavigateBefore /> } 
                        className="text-4xl cursor-pointer hover:scale-105"
                        onClick={() => previous()} 
                        title="Anterior" 
                        type="button"
                    />
                    <Button
                        id="play-pause-button"
                        children={
                            musicIsRunning ? <FaCirclePause className="text-4xl" /> : <FaCirclePlay className="text-4xl" />
                        }
                        onClick={() => playPause()}
                        className="cursor-pointer hover:scale-105"
                        title={`${musicIsRunning ? "Pausar" : "Tocar"}`}
                        type={"button"}
                    />
                    <Button 
                        id="next-music-button" 
                        children={ <MdNavigateNext /> } 
                        className="text-4xl cursor-pointer hover:scale-105"
                        onClick={() => next()}
                        title="Próxima"
                        type="button"
                    />
                    <Button 
                        id="repeat-music-button" 
                        children={ <IoRepeat /> } 
                        className={`text-2xl cursor-pointer hover:scale-105 ${repeat && "text-green-600"}`} 
                        onClick={() => {
                            dispatch(setMusicRepeat(!repeat));
                            setRepeat(!repeat);
                        }} 
                        title="Repetir" 
                        type="button"
                    />
                </div>
                <div className="w-full h-1/3 flex gap-4 items-center">
                    <span className="text-xs font-extralight w-[calc(5%)]">{ formatTime(time) }</span>
                    <input
                        className="w-full h-1 cursor-pointer rounded-lg"
                        type="range"
                        min={0}
                        max={musicAudio.duration}
                        step={1}
                        value={time}
                        onChange={event => {
                            const time = event.target.valueAsNumber; 
                            setTime(time);
                            audio.currentTime = time;
                            dispatch(setMusicSeconds(time))
                        }}
                    />
                    <span className="text-xs font-extralight w-[calc(5%)]">{ formatTime(musicAudio.duration) }</span>
                </div>
            </section>
            <section className="w-[calc(30%)] flex items-center justify-end p-4 gap-4">
                <Button 
                    id="volume-button" 
                    children={   
                        muted ? 
                            <LuVolumeX className="text-2xl cursor-pointer hover:scale-105" /> :
                            volume < 0.2 ? <LuVolume className="text-2xl cursor-pointer hover:scale-105" /> :
                            volume < 0.7 ? <LuVolume1 className="text-2xl cursor-pointer hover:scale-105" /> :
                            volume <= 1 ? <LuVolume2 className="text-2xl cursor-pointer hover:scale-105" /> : 
                            <></>
                    }
                    onClick={() => {
                        const novoVolume = muted ? musicVolume : 0
                        setVolume(novoVolume);
                        setMuted(!muted);
                        audio.volume = novoVolume;
                    }}
                    title="Volume" 
                    type="button"
                />
                <input
                    className="w-32 h-1 cursor-pointer rounded-lg"
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    onChange={event => {
                        const volume = event.target.valueAsNumber;
                        setVolume(volume);
                        setMuted(volume <= 0);
                        dispatch(setMusicVolume(volume));
                        audio.volume = volume;
                    }}
                />
                <Button 
                    id="fullscreen-button" 
                    children={ fullScreen ? <AiOutlineFullscreenExit /> :  <AiOutlineFullscreen /> }
                    className="text-2xl cursor-pointer hover:scale-105"
                    onClick={() => setFullScreen(!fullScreen)}
                    title={`${fullScreen ? "Sair da Tela Inteira" : "Tela Inteira"}`}
                    type="button"
                />
            </section>
        </footer>
    );
};

export default Footer;
