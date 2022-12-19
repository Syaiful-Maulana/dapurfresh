import React from "react";

const Header = ({ title }) => {
    return (
        <header className="bg-primary -mx-[15px] -mt-5">
            <h1 className="text-[22px] font-bold text-white px-[30px] py-[15px]">
                {title}
            </h1>
        </header>
    );
};

export default Header;
