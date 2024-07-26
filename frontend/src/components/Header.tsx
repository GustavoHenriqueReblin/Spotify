import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-20 w-full flex items-center gap-2 p-6">
            <div className="flex-grow flex items-center gap-2">
                <IoChevronBack onClick={() => navigate(-1)} className="text-2xl cursor-pointer hover:scale-105" />
                <IoChevronForward onClick={() => navigate(+1)} className="text-2xl cursor-pointer hover:scale-105" />
            </div>
            <div className="bg-zinc-200 rounded-full font-bold text-zinc-950 text-sm px-4 py-2 cursor-pointer hover:scale-105">Explorar o premium</div>
            <div className="bg-zinc-950 rounded-full font-bold text-zinc-200 text-sm px-4 py-2 cursor-pointer hover:scale-105">Instalar o app</div>
            <div className="rounded-full p-2 bg-black cursor-pointer hover:scale-105">
                <IoMdNotificationsOutline className="text-xl" />
            </div>
            <div className="rounded-full p-1 bg-black cursor-pointer hover:scale-105">
                <div className="h-8 w-8 bg-zinc-200 rounded-full"></div>
            </div>
        </div>
    );
};

export default Header;
