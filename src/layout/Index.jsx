import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="flex justify-center">
            <div className="bg-[#fcfcfc] min-h-screen w-[360px] border px-[15px] py-5 relative overflow-hidden">
                {children}
            </div>
        </div>
    );
};

export default Layout;
