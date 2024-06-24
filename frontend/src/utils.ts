import { format, isToday, isYesterday } from "date-fns";

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