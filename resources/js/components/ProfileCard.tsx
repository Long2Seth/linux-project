import { Card } from "@/components/ui/card";
import React from "react";
import { IoLogoGithub } from "react-icons/io";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import {Link} from "@inertiajs/react";

const iconMap = {
    IoLogoGithub: IoLogoGithub,
    FaFacebook: FaFacebook,
    FaTelegram: FaTelegram,
    AiFillGoogleCircle: AiFillGoogleCircle,
};

type IconMapKeys = keyof typeof iconMap;

type ProfileCardProps = {
    name: string;
    imageUrl: string;
    links: {
        icon: IconMapKeys;
        url: string;
    }[];
};

const ProfileCard = ({ name, imageUrl, links }: ProfileCardProps) => {
    return (
        <div className="profile-container">
            <Card className="relative group">
                <div className="p-6 flex flex-col items-center">
                    <div className="relative w-52 h-52 mb-4">
                        <div className="absolute inset-0 rounded-full border-[4px] border-dashed border-primary-color animate-spin-slow group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-2 rounded-full border-primary-color border-[4px] overflow-hidden group-hover:scale-105 transition-transform duration-300">
                            <img width={800} height={800} src={imageUrl} alt={name} className="w-full h-full object-cover rounded-full" />
                        </div>
                    </div>
                    <div className="relative space-y-1 mt-2">
                        <ul className="flex gap-3 justify-center items-center">
                            {links.map((link, index) => (
                                <Link href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
                                    {React.createElement(iconMap[link.icon], {
                                        className: "text-title-color w-[25px] h-[25px] md:w-[32px] md:h-[32px] dark:text-dark-description-color",
                                    })}
                                </Link>
                            ))}
                        </ul>
                        <div className="bg-cover text-center text-white py-4 w-[280px]"
                             style={{backgroundImage: 'url(/Bg-Profile.png)'}}>
                            <span
                                className="text-base font-semibold uppercase my-[8px] dark:text-dark-description-color">
                                {name}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProfileCard;
