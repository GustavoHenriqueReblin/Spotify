import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface NavBarItemProps {
    to: string;
    title: string;
    iconWhenActive?: ReactElement | undefined;
    iconWhenInactive?: ReactElement | undefined;
    showIcons: boolean;
};

const NavBarItem = ({ to, title, iconWhenActive, iconWhenInactive, showIcons }: NavBarItemProps) => {
    return (
        <NavLink
            className="flex items-center gap-4 py-2"
            to={to}
            end
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
