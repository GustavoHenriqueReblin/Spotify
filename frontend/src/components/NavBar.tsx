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
            <nav className="w-full h-5/6 text-base font-semibold p-6">
                <ul>
                    { menuItems.map((item, i) => (
                        <li className={`p-2 rounded-md ${item.active && "cursor-pointer"} text-zinc-300 hover:text-white`}>
                            <NavBarItem 
                                key={i} 
                                to={item.to}
                                title={item.title}
                                iconWhenActive={item.iconWhenActive}
                                iconWhenInactive={item.iconWhenInactive}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default NavBar;
