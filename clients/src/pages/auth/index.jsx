import React, { useState } from 'react'
import background from '../../assets/login2.png'
import victory from '../../assets/victory.svg'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { useNavigate } from 'react-router-dom';

// import { Button } from "../../components/ui/button";
import { toast } from 'sonner';

import apiClient from '../../lib/utils/apiClient';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../lib/utils/constants.js';
import { useAppStore } from '../../store/index.js';

const Auth = () => {
  const{setUserInfo}=useAppStore()
  const navigate=useNavigate()
  //  State variables for email, password, and confirm password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [confirmPassword, setConfirmPassword] = useState('')

  const validateLogin = () => {
      if(!email.length){
        toast.error('Email is required');
        return false;
      }
      if(!password.length){
        toast.error('Password is required');
        return false;
      }
      
      return true
  }
  const validateSignup = () => {
      if(!email.length){
        toast.error('Email is required');
        return false;
      }
      if(!password.length){
        toast.error('Password is required');
        return false;
      }
      if(password !== confirmPassword){
        toast.error('Passwords do not match');
        return false;
      }
      return true
  }
  
  const handleLogin =async () => {
      if(validateLogin()){
        const response= await apiClient.post(LOGIN_ROUTE, {
          email,      
          password, 
      },{withCredentials:true}
      );
      if(response.data.user.id){
        setUserInfo(response.data.user)

      if(response.data.user.profileSetup) navigate('/chat'); else navigate('/profile');
        console.log(response);  
    }
    // Handle login logic here
    console.log('Login with:', email, password);
    }
  }
  const handleSignup =async () => {
    if(validateSignup()){
      const response= await apiClient.post(SIGNUP_ROUTE, {
        email,      
        password, 
    },{withCredentials:true}
  );
  if(response.status === 201){
        toast.success('Login successful');
        setUserInfo(response.data.user);
        navigate('/profile');
      }
  
    
    }
  };
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gray-500">
      <div className="h-[80vh] bg-white border-white text-opacity-90 shadow-2xl w-[80vw] ms:w-[90vh] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex items-center justify-center flex-col">
          <div className="flex flex-col gap-10 items-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={victory} alt="victory" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!!
            </p>
          </div>

          <div className="flex items-center justify-center w-full mt-4">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Sign up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-4">
                <form className="flex flex-col gap-4">
                  <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full"/>
                  <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full"/>
                  <button className='rounded-full p-6' onClick={(e) => {e.preventDefault(); handleLogin()}}>Login</button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-4">
                <form className="flex flex-col gap-1">
                  <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full"/>
                  <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full"/>
                  <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full"/>
                  
                  <button className='rounded-full p-6 bg-blue-800 text-black' onClick={(e) => {e.preventDefault(); handleSignup()}} >SignUp</button>
                    
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* ✅ You may add an image or branding background in the right half (optional) */}
        <div className="hidden xl:flex items-center justify-center">
          <img src={background} alt="background" className="h-[70vh] object-contain" />
        </div>
      </div>
    </div>
  )
}

export default Auth;
