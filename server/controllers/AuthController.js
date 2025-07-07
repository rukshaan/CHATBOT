import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
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
        const user=await User.create({email,password})
        response.cookie('jwt',createToken(email,user.id),{
            secure:true,
            maxAge,
            sameSite:'None'
        })
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