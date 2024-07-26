import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-20 w-full flex items-center gap-2 p-6">
            <div className="flex-grow flex items-center gap-2">
                <Button 
                    id="back-button" 
                    children={
                        <IoChevronBack onClick={() => navigate(-1)} className="text-2xl cursor-pointer hover:scale-105" />
                    } 
                    title="Voltar" 
                    type="button"
                />
                <Button 
                    id="prev-button" 
                    children={
                        <IoChevronForward onClick={() => navigate(+1)} className="text-2xl cursor-pointer hover:scale-105" />
                    } 
                    title="Avançar" 
                    type="button"
                />
            </div>
            <Button 
                id="explore-button" 
                children={
                    <span>Explorar o premium</span>
                } 
                className="bg-zinc-200 rounded-full font-bold text-zinc-950 text-sm px-4 py-2 cursor-pointer hover:scale-105" 
                title="Explorar o premium" 
                type="button"
            />
            <Button 
                id="install-button" 
                children={
                    <span>Instalar o app</span>
                } 
                className="bg-zinc-950 rounded-full font-bold text-zinc-200 text-sm px-4 py-2 cursor-pointer hover:scale-105" 
                title="Instalar o app" 
                type="button"
            />
            <Button 
                id="notify-button" 
                children={
                    <IoMdNotificationsOutline className="text-xl" />
                } 
                className="rounded-full p-2 bg-black cursor-pointer hover:scale-105" 
                title="Notificações" 
                type="button"
            />
            <Button 
                id="profile-button" 
                children={
                    <div className="h-8 w-8 bg-zinc-200 rounded-full"></div>
                } 
                className="rounded-full p-1 bg-black cursor-pointer hover:scale-105"
                title="Meu Perfil" 
                type="button"
            />
        </div>
    );
};

export default Header;
