import React, { ReactElement } from "react";
import { IoHome, IoHomeOutline  } from "react-icons/io5";
import { BiMenu, BiMenuAltLeft, BiSearch, BiSearchAlt  } from "react-icons/bi";
import { MdAddToPhotos } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import NavBarItem from "./NavBarItem";

interface MenuItems {
    to: string;
    title: string;
    iconWhenActive: ReactElement;
    iconWhenInactive?: ReactElement;
    active: boolean;
};

const NavBar: React.FC = () => {
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
            title: "Sua biblioteca",
            iconWhenActive: <BiMenu className="text-2xl" />,
            iconWhenInactive: <BiMenuAltLeft className="text-2xl" />,
            active: true,
        },
        // Apenas para adicionar um espaço
        {
            to: "",
            title: "",
            iconWhenActive: <></>,
            iconWhenInactive: <></>,
            active: false,
        },
        {
            to: "new-playlist",
            title: "Criar playlist",
            iconWhenActive: <MdAddToPhotos className="text-2xl" />,
            active: true,
        },
        {
            to: "/liked",
            title: "Músicas curtidas",
            iconWhenActive: <AiFillLike className="text-2xl" />,
            iconWhenInactive: <AiOutlineLike className="text-2xl" />,
            active: true,
        },
    ];

    return (
        <aside className="w-80 h-full bg-black">
            <nav className="w-full h-5/6 py-6 pl-6">
                <ul className="text-base font-semibold">
                    { menuItems.map((item, i) => (
                        <li className={`py-2 rounded-md ${item.active && "cursor-pointer"} text-zinc-300 hover:text-white`}>
                            <NavBarItem 
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
                <ul className="text-base font-normal h-[calc(100dvh-369px)] overflow-y-auto">
                    {Array.from({ length: 15 }).map((_, index) => (
                        <li key={index} className="py-2 rounded-md cursor-pointer text-zinc-400 hover:text-white">
                            <NavBarItem 
                                to={"/playlist/" + index}
                                title={"Nome da playlist"}
                                iconWhenActive={<></>}
                                iconWhenInactive={<></>}
                                showIcons={false}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default NavBar;
