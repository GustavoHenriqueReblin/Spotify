import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface NavBarItemProps {
    to: string;
    title: string;
    iconWhenActive: ReactElement;
    iconWhenInactive?: ReactElement;
};

const NavBarItem = ({ to, title, iconWhenActive, iconWhenInactive}: NavBarItemProps) => {
    return (
        <NavLink
            className="flex items-center gap-4"
            to={to}
            end
        >
            {({ isActive }) => (
                <>
                    <div className="w-8 flex items-center justify-start">
                        {isActive ? iconWhenActive : iconWhenInactive ?? iconWhenActive}
                    </div>
                    <span>{ title }</span>
                </>
            )}
        </NavLink>
    );
};

export default NavBarItem;
