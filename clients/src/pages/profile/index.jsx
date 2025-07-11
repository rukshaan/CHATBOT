import React from 'react'
import { useAppStore } from '../../store/index.js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {IoArrowBack} from 'react-icons/io5';
import { Avatar } from '../../components/ui/avatar';
const Profile = () => {
  const navigate = useNavigate();
  const { userInfo,setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChanges = async () => {}

  return (<>
      {/* <div >Email: {userInfo.email}</div> */}
      <div className='bg-[#1b1b1c24] h-[100vh] flex item-center justify-center flex-col gap-10'>
        <div className='flax flex-col gap-10 w-[8vw] md:-max'>
          <div>
            <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer "/>
          </div>
          <div classname="gridgrid-cols-2 ">
            <div classname="h-full w-32 md:w-48 md:w-48 flex item-center justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>={}>
              <Avatar>
                {image ? (
                  <Avatar/>
                ) : (
                  <div>
                    {firstName firstName.split("").shift() : userInfo.spilit("").shift()}
                  </div>)}
              </Avatar>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}
export default Profile