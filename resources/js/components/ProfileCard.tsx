import { Card } from "@/components/ui/card";
import React from "react";

type ProfileCardProps = {
    name: string;
    imageUrl: string;
};

const ProfileCard = ({ name, imageUrl }: ProfileCardProps) => {
    return (
        <div className="profile-container">
            <Card className="relative group border-none shadow-none">
                <div className="p-6 flex flex-col items-center">
                    <div className="relative w-60 h-60 ">
                        <div className="absolute inset-2 rounded-full border-primary-color border-[2px] overflow-hidden group-hover:scale-102 transition-transform duration-300">
                            <img
                                src={imageUrl}
                                alt={name}
                                className="w-full h-[130%] "

                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="relative space-y-1 mt-2">
                        <div
                            className="bg-cover text-center text-white py-4 w-[280px]"
                            style={{ backgroundImage: "url(/Bg-Profile.png)" }}
                        >
              <span className="text-base font-semibold uppercase my-[8px] dark:text-dark-description-color">
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
