import React from 'react'
import { useState } from 'react'
import {GrAttachment} from 'react-icons/gr'
import { icons } from 'lucide-react'
import { RiEmojiStickerLine } from 'react-icons/ri'
import {IoSend} from "react-icons/io5"
import EmojiPicker from 'emoji-picker-react'
import { useRef } from 'react';

const MessageBar = () => {
    const [message,setMessage]=useState("")
    const [emojiPickerOpen,setEmojiPickerOpen]=useState(false)
    const handleAddEmoji = (emoji) =>{
        setMessage((msg)=>msg+emoji.emoji);
        setEmojiPickerOpen(false); // auto-close after selecting
    }
    const handleSendMessage= async ()=>{
        // setMessage((msg)=>msg+emoji.emoji);
        if (!message.trim()) return;
        console.log("Sending message:", message);
        setMessage("");
    }
    const emojiRef=useRef()
  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6'>
        <div className="flex-1 flex bg-[#32a2b3] rounded-md items-center gap-5 pr-5">
            <input type="text" className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
            placeholder="Enter Message"
            value={message}
            onChange={e=>setMessage(e.target.value)}
            />
            <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                <GrAttachment className='text-2xl'/>
            </button>
            <div className='relative'>
                <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={()=>{setEmojiPickerOpen(true)}}>
                    <RiEmojiStickerLine className='text-2xl'/>
                </button>
                {emojiPickerOpen && (
                <div className="absolute bottom-16 right-0 z-50">
                    <EmojiPicker
                    theme="dark"
                    onEmojiClick={handleAddEmoji}
                    autoFocusSearch={false}
                    />
                </div>
)}
            </div>
        </div>
        <button className="bg-[#8417ff]rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:hover:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                <IoSend className='text-2xl' onClick={handleSendMessage}/>
        </button>
    </div>
  )
}

export default MessageBar