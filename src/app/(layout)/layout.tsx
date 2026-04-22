import Navbar from "@/component/shared/Navbar";
import NavbarOne from "@/component/shared/NavbarOne";
import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>

            <div className="fixed top-0 h-fit! w-full z-100!">
                <Navbar />
                {/* <NavbarOne /> */}
            </div>
            {/* <SmoothScroller smooth={1.5} effects={true}> */}
            <div>
                {children}
            </div>
            {/* </SmoothScroller> */}
        </div>
    );
};

export default MainLayout;
