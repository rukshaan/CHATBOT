import User from '../models/UserModel.js';


export const SearchContacts=async(request,response,next) => {
    try{
        const {searchTerm}=request.body;
        if (searchTerm === undefined || searchTerm === null) {
            return response.status(400).json({message:"Search term is required"});
        }
        const sanitizedSearchTerm=searchTerm.replace(/[^a-zA-Z0-9]/g, '');
        const regex =new RegExp(sanitizedSearchTerm, 'i');

        const contacts = await User.find({
            $and: [{ _id:{ $ne: request.userId } },{$or: [{ firstName: regex },{ lastName: regex },{ email: regex }] }]});

        return response.status(200).json({contacts});
        
    }
    catch(error){
        console.error("Error in signup:", error);
        response.status(500).json({message:"Internal server error"});
    }
}