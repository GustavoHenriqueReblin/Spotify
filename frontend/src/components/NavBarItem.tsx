import React, { ReactElement } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylistId } from "../store/playistSlice";

interface NavBarItemProps {
    id: number | undefined;
    to: string | undefined;
    title: string;
    iconWhenActive?: ReactElement | undefined;
    iconWhenInactive?: ReactElement | undefined;
    showIcons: boolean;
};

const NavBarItem = ({ id, to, title, iconWhenActive, iconWhenInactive, showIcons }: NavBarItemProps) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { playlistId  } = useSelector((state: any) => state.global.playlist);

    return (
        <NavLink
            className={`flex items-center gap-4 py-2 rounded-lg ${id === playlistId && "text-zinc-500 hover:text-zinc-200"}`}
            to={to ?? location.pathname}
            end
            onClick={() => dispatch(setPlaylistId(id ?? null))}
        >
            {({ isActive }) => (
                <>
                    { showIcons && (
                        <div className="w-8 flex items-center justify-start">
                            {isActive ? iconWhenActive : iconWhenInactive ?? iconWhenActive}
                        </div>
                    )}
                    <span>{ title }</span>
                </>
            )}
        </NavLink>
    );
};

export default NavBarItem;
