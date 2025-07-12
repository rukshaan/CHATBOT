import React, { useState, useEffect } from "react";
import { useAppStore } from "../../store/index.js";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { getColor,colors } from "../../lib/utils";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  // For testing: preload dummy data
  useEffect(() => {
    setFirstName("Joseph");
    // setImage("https://i.pravatar.cc/150"); // uncomment to test with image
  }, []);

  const saveChanges = async () => {
    // Save logic here
  };

  return (
    <div className="bg-[#2222be24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-full md:w-[40vw]">
        <IoArrowBack
          className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName[0]
                    : userInfo?.email?.[0]?.toUpperCase()}
                </div>
              )}
            </Avatar>

            {hovered && (
              <div className="absolute insert-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 cursor-pointer rounded-full h-full w-full">
                {image ? (
                  <FaTrash className="text-red-600 cursor-pointer" />
                ) : (
                  <FaPlus className="text-white-600 text-3xl cursor-pointer" />
                )}
              </div>
            )}
            {/* <input type='text' onChange={(e) => setFirstName(e.target.value)} />*/}
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white item-center justify-center'>
            <div className="w-full">
              <input placeholder="Email"disabled type='email'value={userInfo.email}  className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className="w-full">
              <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} type='text' value={firstName}  className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className="w-full">
              <input placeholder="last Name" onChange={(e) => setLastName(e.target.value)} type='text' value={lastName}  className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className='w-full flex gap-5'>
              {
                colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-full  duration-300 transition-all cursor-pointer ${color} ${selectedColor === index ? 'ring-2 ring-white' : ''} `}//${color} ${selectedColor === index ? 'ring-2 ring-white' : ''}
                    onClick={() => setSelectedColor(index)}>

                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='w-full'>
          <button className='h-14 w-100 flex items-center justify-center text-white bg-purple-700 hover:bg-purple-600 transition-all duration-300' onClick={saveChanges}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
