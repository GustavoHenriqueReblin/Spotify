import React, { ReactElement, useEffect, useState } from "react";
import { IoHome, IoHomeOutline  } from "react-icons/io5";
import { BiMenu, BiMenuAltLeft, BiSearch, BiSearchAlt  } from "react-icons/bi";
import { MdAddToPhotos } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import NavBarItem from "./NavBarItem";
import { User, Playlist } from "../types";
import SkeletonLoad from "./SkeletonLoad";

interface MenuItems {
    to: string | undefined;
    title: string;
    iconWhenActive: ReactElement;
    iconWhenInactive?: ReactElement;
    active: boolean;
};

interface NavBarProps {
    user: User;
    userLoading: boolean;
};

const NavBar = ({ user, userLoading }: NavBarProps) => {
    const menuItems: MenuItems[] = [
        {
            to: "/",
            title: "Início",
            iconWhenActive: <IoHome className="text-2xl" />,
            iconWhenInactive: <IoHomeOutline className="text-2xl" />,
            active: true,
        },
        {
            to: "/search",
            title: "Buscar",
            iconWhenActive: <BiSearchAlt className="text-2xl" />,
            iconWhenInactive: <BiSearch className="text-2xl" />,
            active: true,
        },
        {
            to: "/library",
            title: "Sua Biblioteca",
            iconWhenActive: <BiMenu className="text-2xl" />,
            iconWhenInactive: <BiMenuAltLeft className="text-2xl" />,
            active: true,
        },
        // Apenas para adicionar um espaço
        {
            to: undefined,
            title: "",
            iconWhenActive: <></>,
            iconWhenInactive: <></>,
            active: false,
        },
        {
            to: "new-playlist",
            title: "Criar Playlist",
            iconWhenActive: <MdAddToPhotos className="text-2xl" />,
            active: true,
        },
        {
            to: "/liked",
            title: "Músicas Curtidas",
            iconWhenActive: <AiFillLike className="text-2xl" />,
            iconWhenInactive: <AiOutlineLike className="text-2xl" />,
            active: true,
        },
    ];
    
    const [loading, setLoading] = useState<boolean>(true);
    const [library, setLibrary] = useState<Playlist[] | undefined>(undefined);

    const fetchLibrary = async () => {
        if (!user || userLoading) return;

        const baseURL = process.env.REACT_APP_SERVER_URL ?? "";
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        };

        try {
            const res = await fetch(`${baseURL}/library/${user.id}`, {
                method: "GET",
                headers,
            });

            if (!res.ok) throw new Error('Failed to fetch library');
    
            const library = await res.json() as Playlist[];
            setLibrary(library);
        } catch (error) {
            console.error('Library fetch error:', error);
            throw new Error('Library fetch failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLibrary();
    }, [user, userLoading]);

    return (
        <aside className="w-72 h-full bg-black">
            <nav className="w-full h-5/6 py-6 pl-6">
                <ul className="text-sm font-medium">
                    { menuItems.map((item, i) => (
                        <li key={i} className={`rounded-md ${item.active && "cursor-pointer"} text-zinc-200 hover:text-white`}>
                            <NavBarItem 
                                id={undefined}
                                key={i} 
                                to={item.to}
                                title={item.title}
                                iconWhenActive={item.iconWhenActive}
                                iconWhenInactive={item.iconWhenInactive}
                                showIcons={true}
                            />
                        </li>
                    ))}
                </ul>
                <div className="h-[calc(1px)] w-full bg-zinc-600 mt-4"></div>

                <ul className="text-sm font-medium h-[calc(100dvh-352px)] overflow-y-auto">
                    { loading ? (
                        <SkeletonLoad count={6} />
                    ) : (
                        <>
                            { library ? 
                                library.map((playlist, i) => (
                                    <li key={i} className={`rounded-md cursor-pointer text-zinc-500 hover:text-zinc-200`}>
                                        <NavBarItem 
                                            id={playlist.id}
                                            key={i} 
                                            to={"/playlist"}
                                            title={playlist.name}
                                            iconWhenActive={<></>}
                                            iconWhenInactive={<></>}
                                            showIcons={false}
                                        />
                                    </li>
                                )) : (
                                <div className="mt-4">
                                    <span className="text-sm">Nenhuma playlist encontrada :(</span>
                                </div>
                            )}
                        </>
                    )}
                </ul>
            </nav>
        </aside>
    );
}

export default NavBar;
