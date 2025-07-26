import React from 'react';

import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar.jsx";



const ProfileInfo = ({ userInfo = {}, selectedColor = 'bg-blue-500', image }) => {
  const firstName = userInfo?.firstName || '';

  const getColor = (color) => {
    // You can customize this logic
    return color || 'bg-purple-500';
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {image ? (
              <AvatarImage
                src={image}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-10 w-10 text-md border border-white flex items-center justify-center rounded-full ${getColor(
                  selectedColor
                )}`}
              >
                {firstName ? firstName[0] : userInfo?.email?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </Avatar>
        </div>
        <span className="text-white text-sm">{firstName || 'Unknown User'}</span>
      </div>
    </div>
  );
};

export default ProfileInfo;
