import React from 'react'
import { useAppStore } from '../../store'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { toast } from 'sonner';

const Chat = () => {
  // const { userInfo } = useAppStore();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   toast('Please complete your profile setup before accessing the chat.');
  //   if (!userInfo.profileSetup) {
  //     navigate('/profile');
  //   }
  // }, [userInfo, navigate]);
  return (
    <div>Chat Page</div>
  )
}
export default Chat