import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlaylistId } from "../store/playistSlice";

interface NavBarItemProps {
    id: number | undefined;
    to: string;
    title: string;
    iconWhenActive?: ReactElement | undefined;
    iconWhenInactive?: ReactElement | undefined;
    showIcons: boolean;
};

const NavBarItem = ({ id, to, title, iconWhenActive, iconWhenInactive, showIcons }: NavBarItemProps) => {
    const dispatch = useDispatch();

    return (
        <NavLink
            className="flex items-center gap-4 py-2"
            to={to}
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
