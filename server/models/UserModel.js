import mongoose from  'mongoose'
import { genSalt,hash } from 'bcrypt';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        trim: true,
    },
    fistName:{
        type: String,
        required: false,
        
    },
    lastName:{
        type: String,
        required: false,
        
    },
    image:{
        type: String,
        required: false,
        
    },
    color:{
        type: Number,
        required: false,
        
    },
    profileSetup:{
        type: Boolean,
        default: false,
    },

});
userSchema.pre('save', async function(next) {
    const salt=await genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
    
    next();
});
const User= mongoose.model('User', userSchema);
export default User;