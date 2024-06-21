import React, { useEffect, useRef, useState } from "react";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { TbArrowsRandom } from "react-icons/tb";
import { IoRepeat } from "react-icons/io5";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { LuVolumeX, LuVolume2, LuVolume1, LuVolume } from "react-icons/lu";

import { User } from "../types";

interface FooterProps {
    user: User;
};

const audioUrl = "https://firebasestorage.googleapis.com/v0/b/spotify-2e788.appspot.com/o/Don't%20You%20Worry%20Child%20%7Bid-1%7D.mp3?alt=media&token=9d3640ef-d585-4ea8-9520-56b84dafd499";
const audio = new Audio(audioUrl);

const Footer = ({ user }: FooterProps) => {
    const [time, setTime] = useState<number>(0);
    const [timeInString, setTimeInString] = useState<string>("0:00");
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [manualChange, setManualChange] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [repeat, setRepeat] = useState<boolean>(false);
    const [like, setLike] = useState<boolean>(false);
    const timeMax = 212; // Depois pegar o tempo da música na base - esse tempo agora é da const audioUrl

    const [volume, setVolume] = useState<number>(0.2);
    const [muted, setMuted] = useState<boolean>(false);
    const [fullScreen, setFullScreen] = useState<boolean>(false);

    const formatTime = (time: number): string => {
        if (time < 60) {
            return "0:" + (time < 10 ? "0" + time : time);
        } else {
            const minute = Math.floor(time / 60);
            const restOfSeconds = time - (minute * 60);
            return minute + ":" + (restOfSeconds < 10 ? "0" + restOfSeconds : restOfSeconds);
        }
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime + 1 > timeMax) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null;
                        setIsRunning(false);

                        if (repeat) {
                            setTime(0);
                            setTimeout(() => {
                                setIsRunning(true);
                                audio.play();
                            }, 250);
                        }
                    }
                    return prevTime + 1;
                });
            }, 1000);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    useEffect(() => {
        setTimeInString(formatTime(time));
        if (manualChange) {
            audio.currentTime = time;
            setManualChange(false);
        }
    }, [time]);

    useEffect(() => {
        audio.volume = volume;
        setMuted(volume <= 0);
    }, [volume]);

    const handlePlayPause = () => {
        isRunning ? audio.pause() : audio.play();
        setIsRunning(!isRunning);
    };

    return (
        <footer className="w-full h-24 max-h-28 bg-zinc-900 absolute bottom-0 flex text-zinc-300">
            <section className="w-[calc(30%)] flex items-center justify-start p-4">
                <div className="w-16 h-16 bg-zinc-500">
                    <img></img>
                </div>
                <div className="mx-5 flex flex-col">
                    <h3 
                        className="w-fit max-w-42 text-sm font-semibold cursor-pointer hover:underline whitespace-nowrap overflow-hidden text-ellipsis">
                            Nome da música
                    </h3>
                    <span 
                        className="w-fit max-w-42 text-xs font-light cursor-pointer hover:underline whitespace-nowrap overflow-hidden text-ellipsis">
                            Artistas
                    </span>
                </div>
                { like ? (
                    <GoHeartFill
                        title="Descurtir" 
                        className="text-lg mx-2 cursor-pointer hover:text-white"
                        onClick={() => setLike(!like)} 
                    />
                ) : (
                    <GoHeart 
                        title="Curtir" 
                        className="text-lg mx-2 cursor-pointer hover:text-white"
                        onClick={() => setLike(!like)} 
                    />
                )}
            </section>
            <section className="w-2/5 flex flex-col items-center justify-center p-4">
                <div className="w-full h-2/3 flex items-center justify-center gap-4 pb-2">
                    <TbArrowsRandom title="Ordem aleatória" className="text-2xl cursor-pointer hover:scale-105" />
                    <MdNavigateBefore title="Anterior" className="text-4xl cursor-pointer hover:scale-105" />
                    <div title={`${isRunning ? "Pausar" : "Tocar"}`} id="play-pause-button" className="cursor-pointer hover:scale-105" onClick={handlePlayPause}>
                        { isRunning ? <FaCirclePause className="text-4xl" /> : <FaCirclePlay className="text-4xl" /> }
                    </div> 
                    <MdNavigateNext title="Próxima" className="text-4xl cursor-pointer hover:scale-105" />
                    <IoRepeat 
                        title="Repetir" 
                        className={`text-2xl cursor-pointer hover:scale-105 ${repeat && "text-green-500"}`} 
                        onClick={() => setRepeat(!repeat)} 
                    />
                </div>
                <div className="w-full h-1/3 flex gap-4 items-center">
                    <span className="text-xs font-extralight">{ timeInString }</span>
                    <input
                        className="w-full h-1 cursor-pointer rounded-lg"
                        type="range"
                        min={0}
                        max={timeMax}
                        step={1}
                        value={time}
                        onChange={event => {
                            setTime(event.target.valueAsNumber);
                            setManualChange(true);
                        }}
                    />
                    <span className="text-xs font-extralight">{ formatTime(timeMax) }</span>
                </div>
            </section>
            <section className="w-[calc(30%)] flex items-center justify-end p-4 gap-4">
                <div onClick={() => {
                    muted ? setVolume(0.2) : setVolume(0);
                    setMuted(!muted);
                }}>
                    {   muted ? <LuVolumeX className="text-2xl cursor-pointer hover:scale-105" /> :
                        volume < 0.3 ? <LuVolume className="text-2xl cursor-pointer hover:scale-105" /> :
                        volume < 0.8 ? <LuVolume1 className="text-2xl cursor-pointer hover:scale-105" /> :
                        volume <= 1 ? <LuVolume2 className="text-2xl cursor-pointer hover:scale-105" /> : 
                        null
                    }
                </div>
                <input
                    className="w-32 h-1 cursor-pointer rounded-lg"
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    onChange={event => {
                        setVolume(event.target.valueAsNumber);
                    }}
                />
                <div>
                    { fullScreen 
                        ? <AiOutlineFullscreenExit title="Sair Tela Cheia" className="text-2xl cursor-pointer hover:scale-105" />
                        : <AiOutlineFullscreen title="Tela Inteira" className="text-2xl cursor-pointer hover:scale-105" /> 
                    } 
                </div>
            </section>
        </footer>
    );
};

export default Footer;
