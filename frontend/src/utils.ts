import { format, isToday, isYesterday } from "date-fns";
import { Music } from "./types";

export const formatDate = (date: string) => {
    if (isToday(date)) {
        const hour = format(date, 'HH:mm');
        return `Hoje ${hour}`;
    } else if (isYesterday(date)) {
        const hour = format(date, 'HH:mm');
        return `Ontem ${hour}`;
    } else {
        return format(date, 'dd-MM-yyyy HH:mm');
    };
};

export const formatTime = (time: number): string => {
    if (time < 60) {
        return "0:" + (time < 10 ? "0" + time : time);
    } else {
        const minute = Math.floor(time / 60);
        const restOfSeconds = time - (minute * 60);
        return minute + ":" + (restOfSeconds < 10 ? "0" + restOfSeconds : restOfSeconds);
    }
};

export const sumMusicsTime = (musics: Music[]): string => {
    const totalSeconds = musics.reduce((acc, music) => acc + music.duration, 0);
    const totalMinutes = totalSeconds / 60;
    if (totalMinutes < 60) {
        return totalMinutes.toFixed() + " minutos";
    } else {
        return (totalMinutes / 60).toFixed() + " horas";
    }
};