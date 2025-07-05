import React from 'react'
import background from '../../assets/login2.png'
import victory from '../../assets/victory.svg'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
const Auth = () => {
  return (
    <div className="h-{100vh} w-[100vw] flex items-center justify-center bg-gray-500">
      <div className='h-[80vh] bg-white border-white text-opacity-90 shadow-2xl w-[80vw] ms:w-[90vh] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2' >
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col gap-10 items-center '>
                <div className='flex items-center justify-center '>
                    <h1 className='text-5xl font-bold md:text-6xl'>Welcome</h1>
                    <img src={victory} alt='victory image'className='h-[100px] '/>
                </div>
                <p className='font-medium text-center'> fill in the details to get started with the best chat aoo!!</p>
            </div>
            <div className='flex item-center justify-center w-full'>
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="bg-transparent rounded-none w-full">
                        <TabsTrigger
                        value="login"
                        className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                        >
                        Login
                        </TabsTrigger>
                        <TabsTrigger
                        value="signup"
                        className="text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                        >
                        Sign up
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="mt-4">
                        {/* Your login form goes here */}
                    </TabsContent>
                    <TabsContent value="signup" className="mt-4">
                        {/* Your sign-up form goes here */}
                    </TabsContent>
                    </Tabs>

            </div>
        </div>
      </div>
    </div>
  )
}
export default Auth