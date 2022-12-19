import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillShop } from "react-icons/ai";
import { AiOutlineHistory } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

const Navbar = () => {
    const activeLink = " text-primary font-semibold flex flex-col items-center";
    const normalLink = " text-[#C4C4C4] font-medium flex flex-col items-center";

    return (
        <nav className="h-[60px] bg-white -ml-[15px] flex items-center border-t-2 fixed w-[360px] bottom-0">
            <ul className="flex justify-around w-full">
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? activeLink : normalLink
                        }
                    >
                        <span>
                            <AiFillShop size="24px" />
                        </span>
                        Belanja
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/history"
                        className={({ isActive }) =>
                            isActive ? activeLink : normalLink
                        }
                    >
                        <AiOutlineHistory size="24px" />
                        Riwayat
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive ? activeLink : normalLink
                        }
                    >
                        <BsFillPersonFill size="24px" />
                        Profil
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
