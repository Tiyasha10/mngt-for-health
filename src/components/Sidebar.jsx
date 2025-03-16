import React, { useState } from "react";
import { navLinks } from "../constants";
import { sun } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { IconHeartHandshake } from "@tabler/icons-react";

const Icon = ({ name, imageUrl, isActive, handleClick }) => {
    return (
        <div 
            className={`relative group h-[64px] w-[50px] rounded-[10px] flex items-center justify-center cursor-pointer 
            transition-all duration-300 ease-in-out 
            ${isActive === name ? 'bg-[#2c2f32] shadow-md' : 'hover:bg-[#3a3a43]'} 
            hover:scale-110`}
            onClick={handleClick}
        >
            <img
                src={imageUrl}
                alt={name}
                className={`h-8 w-8 transition-all duration-300 object-contain 
                ${isActive !== name ? 'grayscale opacity-60' : ''}`} // ✅ Ensure GIF is animated
            />

            {/* Tooltip positioned ABOVE the cursor */}
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className="bg-black text-white text-xs rounded-md px-3 py-2 shadow-lg whitespace-nowrap">
                    {name}
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rotate-45" />
            </div>
        </div>
    );
};

const Sidebar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("dashboard");

    return (
        <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
            <Link to='/'>
                <div className="rounded-[10px] bg-[#2c2f32] p-2">
                    <IconHeartHandshake size={40} color="#1ec070" />
                </div>
            </Link>
            <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4">
                <div className="flex flex-col items-center justify-center gap-3">
                    {navLinks.map((link) => (
                        <Icon
                            key={link.name}
                            {...link}
                            isActive={isActive}
                            handleClick={() => {
                                setIsActive(link.name);
                                navigate(link.link);
                            }}
                        />
                    ))}
                    <div>
                        <Icon 
                            name="sun" 
                            imageUrl={sun} 
                            isActive={isActive} 
                            handleClick={() => {
                                setIsActive("sun");
                            }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
