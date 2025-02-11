import React, {useState} from "react";
import { navLinks } from "../constants";
import { sun } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { IconHeartHandshake } from "@tabler/icons-react";

const Icon = ({ styles, name, imageUrl, isActive, handleClick }) => {
    return (
        <div
            className={`h-[64px] w-[50px] rounded-[10px] flex items-center justify-center cursor-pointer 
            transition-all duration-300 ease-in-out
            ${isActive === name ? 'bg-[#2c2f32] shadow-md' : 'hover:bg-[#3a3a43]'} 
            hover:scale-110`}
            onClick={handleClick}
        >
            <img
                src={imageUrl}
                alt="icon"
                className={`h-6 w-6 transition-all duration-300 
                ${isActive !== name ? 'grayscale opacity-60' : ''}`}
            />
        </div>
    );
};


const Sidebar=() => {
    const navigate= useNavigate()
    const [isActive, setIsActive ]= useState("dashboard");
    return (
        <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
            <Link 
             to='/'
            >
                <div className="rounded -[10px] bg-[#2c2f32] p-2">
                    <IconHeartHandshake size={40} color="#1ec070"/>
                </div>
            </Link>
                <div className="mt-12 flex w-[76px] flex-1 flex-col items-center 
                 justify-between rounded-[20px] bg-[#1c1c24] py-4 ">
                    <div className="flex flex-col items-center justify-center gap-3">
                        {
                            navLinks.map((link)=>(
                                <Icon
                                    key={link.name}
                                    {...link}
                                    isActive={isActive}
                                    handleClick={()=>{
                                            setIsActive(link.name);
                                            navigate(link.link);
                                        }
                                    }
                                />
                                ))
                        }
                        <div className>
                           <Icon styles="bg-[#1c1c24] shadow-secondary" imageUrl={sun} />
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Sidebar;