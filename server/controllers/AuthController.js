import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { renameSync, unlinkSync, existsSync, mkdirSync } from 'fs'; // ✅ add this
import path from 'path';
import fs from 'fs';
const maxAge=3*24*60*60*1000; // 24 hours in milliseconds
const createToken=(email,userId) =>{
    return jwt.sign({email,userId},process.env.JWT_SECRET,{
        expiresIn:maxAge
    });
}

export const signup=async(request,response,next) => {
    try{
        const {email,password}=request.body;

        if(!email || !password){
            return response.status(400).json({message:"Email and password are required"});
        }
        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(409).json({ message: "User already exists" });
        }

        const user=await User.create({email,password})
        const isProduction = process.env.NODE_ENV === 'production';

        response.cookie('jwt', createToken(email, user.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS in prod
            sameSite: 'None',
            maxAge
        });

        return response.status(201).json({user:{
            id:user.id,
            email:user.email,
            
            profileSetup:user.profileSetup
        }})
    }
    catch(error){
        console.error("Error in signup:", error);
        response.status(500).json({message:"Internal server error"});
    }
}

export const login=async(request,response,next) => {
    try{
        const {email,password}=request.body;

        if(!email || !password){
            return response.status(400).json({message:"Email and password are required"});
        }
        

        const user=await User.findOne({email})
        if(!user){
            return response.status(404).json({message:"User not found"});
        }   
        const auth= await compare(password,user.password);
        if(!auth){
            return response.status(401).json({message:"Invalid credentials"});
        }
        const isProduction = process.env.NODE_ENV === 'production';
        
        response.cookie('jwt',createToken(email,user.id),{
            secure:true,
            maxAge,
            sameSite:'None'
        })
        return response.status(200).json({user:{
            id:user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            image:user.image,
            color:user.color,
            profileSetup:user.profileSetup
        }})
    }
    catch(error){
        console.error("Error in signup:", error);
        response.status(500).json({message:"Internal server error"});
    }
}



export const getUserInfo =async(request,response,next) => {
    try{
        console.log(request.userId);
        const userData = await User.findById(request.userId);
        if (!userData) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.status(200).json({
            
            
                id:userData.id,
                email:userData.email,
                firstName:userData.firstName,
                lastName:userData.lastName,
                image:userData.image,
                color:userData.color,
                profileSetup:userData.profileSetup
            
        })

    }
    catch(error){
        console.error("Error in signup:", error);
        response.status(500).json({message:"Internal server error"});
    }
}
export const updateProfile = async (request, response, next) => {
    try{
        
        const {userId} =request;
        const { firstName, lastName, image, color } = request.body;
        console.log('image data',request.body);
        if (!firstName || !lastName ) {
            return response.status(400).json({ message: "First name, last name and color are required" });
        }

        let sanitizedImage = image;
        if (image?.startsWith('http')) {
        const url = new URL(image);
        sanitizedImage = url.pathname.replace(/^\/+/, ''); // remove leading slashes
        }
        
        const userData = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            image:sanitizedImage,
            color,
            profileSetup: true
        }, { new: true,runValidators: true });  
        return response.status(200).json({
                id:userData.id,
                email:userData.email,
                firstName:userData.firstName,
                lastName:userData.lastName,
                image:userData.image,
                color:userData.color,
                profileSetup:userData.profileSetup.userId
            
        })

    }
    catch(error){
        console.error("Error in signup:", error);
        response.status(500).json({message:"Internal server error"});
    }

}
export const addProfileImage = async (request, response) => {
  try {
    console.log("file is",request.file);
    if (!request.file) {
      return response.status(400).json({ message: "Image is required" });
    }

    const uploadDir = 'uploads/profiles';
    if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
    }
    const timestamp = Date.now();
    const sanitizedFilename = request.file.originalname.replace(/\s+/g, '_');
    const fileName = `${uploadDir}/${timestamp}-${sanitizedFilename}`;


    
    renameSync(request.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      request.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );

    return response.status(200).json({
      image: updatedUser.image,
    });

  } catch (error) {
    console.error("Error in addProfileImage:", error);
    response.status(500).json({ message: "Internal server error:::::::::::::::::" });
  }
};
// export const removeProfileImage = async (request, response, next) => {
//     try{
//         console.log(request.userId);
//         const {userId} =request;
//         const user= await User.findById(userId);
//         if(!user){
//             return response.status(404).send({message:"User not found"});
//         }
//         if(user.image){
//             unlinkSync(user.image);
//         }
//         user.image=null;
//         await user.save();
         
//         return response.status(200).json({ message: "Profile image removed successfully" });


//     }
//     catch(error){
//         console.error("Error in signup:", error);
//         response.status(500).json({message:"Internal server error"});
//     }
// }

import { fileURLToPath } from 'url';


export const removeProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    if (user.image) {
    //   const imagePath = path.join(process.cwd(), 'server', user.image); // absolute path to image
        const imagePath = path.join(__dirname, '..', user.image); // assuming controller is inside server/controllers/

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // safely delete
      }

      user.image = null;
      await user.save();
    }

    return res.status(200).json({ message: "Profile image removed successfully" });
  } catch (error) {
    console.error("Error in removeProfileImage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const logout=async(request,response,next) => {
    try{
        response.clearCookie('jwt',{httpOnly:true,sameSite:'None'})
        return response.status(200).json({message:"Logout successful"})
    }
    catch(error){
        console.error("Error in signup:", error);
        response.status(500).json({message:"Internal server error"});
    }
}