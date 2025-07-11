import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
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
            firtName:user.firstName,
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
                profileSetup:userData.profileSetup.userId
            
        })

    }
    catch(error){
        console.error("Error in signup:", error);
        response.status(500).json({message:"Internal server error"});
    }
}