import React, { useEffect, useRef, useState } from "react";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { User } from "../types";

interface FooterProps {
    user: User;
};

const Footer = ({ user }: FooterProps) => {
    const [time, setTime] = useState<number>(0);
    const [timeInString, setTimeInString] = useState<string>("0:00");
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeMax = 156; // Depois pegar o tempo da música na base

    const [volume, setVolume] = useState<number>(0.5);
    const [muted, setMuted] = useState<boolean>(false);

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
                    if (prevTime + 1 >= timeMax) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null;
                        setIsRunning(false);
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
    }, [time]);

    const handlePlayPause = () => {
        setIsRunning(!isRunning);
    };

    return (
        <footer className="w-full h-24 max-h-28 bg-zinc-800 absolute bottom-0 flex text-zinc-300">
            <section className="w-[calc(30%)] flex items-center justify-start p-4">
                <div className="w-16 h-16 bg-zinc-500">
                    <img></img>
                </div>
                <div className="mx-5 flex flex-col">
                    <h3 className="w-fit max-w-42 text-sm font-semibold cursor-pointer hover:underline whitespace-nowrap overflow-hidden text-ellipsis">Nome da música</h3>
                    <span className="w-fit max-w-42 text-xs font-light cursor-pointer hover:underline whitespace-nowrap overflow-hidden text-ellipsis">Artistas</span>
                </div>
                <GoHeart className="text-lg mx-2 cursor-pointer hover:text-white" />
            </section>
            <section className="w-2/5 flex flex-col items-center justify-center p-4">
                <div className="w-full h-2/3 flex flex-col items-center">
                    <button onClick={handlePlayPause}>
                        {isRunning ? 'Pause' : 'Play'}
                    </button>
                </div>
                <div className="w-full h-1/3 flex gap-4 items-center">
                    <span className="text-xs font-extralight">{ timeInString }</span>
                    <input
                        className="w-full h-1 cursor-pointer"
                        type="range"
                        min={0}
                        max={timeMax}
                        step={1}
                        value={time}
                        onChange={event => {
                            setTime(event.target.valueAsNumber)
                        }}
                    />
                    <span className="text-xs font-extralight">{ formatTime(timeMax) }</span>
                </div>
            </section>
            <section className="w-[calc(30%)] flex items-center justify-end p-4">
            </section>
        </footer>
    );
};

export default Footer;
