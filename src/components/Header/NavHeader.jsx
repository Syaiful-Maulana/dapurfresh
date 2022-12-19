import React, { useState } from "react";
import { IoIosArrowRoundBack, IoIosSearch,IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NavHeader = ({ title, type, onKeyUp, onChange, value, clearSearch }) => {
    const navigate = useNavigate();

    return (
        <header className={`${type === "search" ? "px-3" : "border-b-2 border-[#E5E5E5] pb-3"} flex items-center mb-3 -mx-[15px] pl-[10px]`}>
            {type === "search" ? 
            <button onClick={() => navigate("/")} className="cursor-pointer">
                <IoIosArrowRoundBack color="#6AA434" size="40" />
            </button>
            :
            <button onClick={() => navigate(-1)} className="cursor-pointer">
                <IoIosArrowRoundBack color="#6AA434" size="40" />
            </button>
            }
            {type === "search" ? 
            <div className="px-4 py-3 flex w-full flex-row bg-zinc-100 rounded-full items-center">
                <IoIosSearch size={18} color="#707585" />
                <input
                    type="text"
                    value={value}
                    placeholder="Cari sayur, bumbu dapur, lauk pauk ..."
                    className="bg-transparent text-[#707585] text-xs border-0 focus:outline-none w-full pl-3"
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                />
                {value && 
                    <button onClick={clearSearch}>
                        <IoIosCloseCircle color="#707585" size={18}/>
                    </button>
                }
            </div>
            :
            <h3 className="pl-3 font-semibold text-base">{title}</h3>    
            }
        </header>
    );
};

export default NavHeader;
