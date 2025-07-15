import React, { useState, useEffect, useRef } from "react";
import { useAppStore } from "../../store/index.js";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { getColor,colors } from "../../lib/utils";
import apiClient from "../../lib/utils/apiClient";
import { toast } from "sonner";
import { REMOVE_IMAGE_PROFILE_ROUTE, UPDATE_PROFILE_ROUTE } from "../../lib/utils/constants.js";
import { ADD_IMAGE_PROFILE_ROUTE } from "../../lib/utils/constants.js";
import { HOST } from "../../lib/utils/constants.js";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input.jsx";
const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef =useRef(null);
  
  // For testing: preload dummy data
  useEffect(() => {
    if(userInfo){
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName|| "");
      setSelectedColor(userInfo.color || 0);
      setImage(userInfo.image ? `${HOST}/${userInfo.image}` : "");
    }
    
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName.length) {
      toast.error("First name is required");
      return false;
    }
    if (!lastName.length) {
      toast.error("Last name is required");
      return false;
    }
    return true;
  };
  const saveChanges = async () => {
  if (validateProfile()) {
    try {
      const response = await apiClient.post(
        UPDATE_PROFILE_ROUTE,
        {
          firstName,
          lastName,
          image,
          color: selectedColor,
        },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data) {
        setUserInfo(response.data);
        toast.success("Profile updated successfully");
        navigate("/chat");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile2");
    }
  }
};

const handleFileInputClick = () => {
  fileInputRef.current.click();
}
const handleImageChange = async (e) => {
  const file= e.target.files[0];
  console.log(file);
  if(file){
    const formData= new FormData();
    formData.append('profile-image',file)
    const response = await apiClient.post(
      ADD_IMAGE_PROFILE_ROUTE,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data' // ✅ REQUIRED
        }
      }
    );
    if(response.status===200 && response.data.image ){
      setUserInfo({...userInfo, image:response.data.image});
      toast.success('Image uploaded successfully');
      
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
}
const handleDeleteImage = async (e) => {
  try{
    console.log("responsesss",REMOVE_IMAGE_PROFILE_ROUTE)
    const response =await apiClient.delete(REMOVE_IMAGE_PROFILE_ROUTE,{withCredentials:true});
    
    if(response.status === 200){
      setUserInfo({...userInfo, image:""});
      toast.success('Image removed successfully');
      setImage(null);
    }

  }
  catch(err){
    console.log('Error removing image',err);
  }
}
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gray-500">
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
              <div className="absolute insert-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 cursor-pointer rounded-full h-full w-full"
              onClick={image ? handleDeleteImage : handleFileInputClick }>
                {image ? (
                  <FaTrash className="text-red-600 cursor-pointer" />
                ) : (
                  <FaPlus className="text-white-600 text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <Input type='file' ref={fileInputRef} className="hidden" onChange={handleImageChange} name='profile-image' accept=".png , .jpg , .jpeg , .svg , .webp"/>
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white item-center justify-center'>
            <div className="w-full">
              <Input placeholder="Email"disabled type='email'value={userInfo.email}  className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className="w-full">
              <Input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} type='text' value={firstName}  className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className="w-full">
              <Input placeholder="last Name" onChange={(e) => setLastName(e.target.value)} type='text' value={lastName}  className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
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
          <Button className='h-14 w-100 flex items-center justify-center text-white bg-purple-700 hover:bg-purple-600 transition-all duration-300' onClick={saveChanges}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
