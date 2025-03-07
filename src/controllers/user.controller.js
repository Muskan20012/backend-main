import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { error } from "console";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async (req,res) => {
    const {fullName,email,userName,password}=req.body
    // console.log("email",email)
    if ([fullName, email, userName, password].some((fields)=>
        fields?.trim()===""
    )) {
        throw new ApiError(400,"All fields required",error)
    }

    function valid(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    if(!valid(email)){
        throw new ApiError(400,"Email Invalid")
    }

    const existingUser=User.findOne({
        $or:[{userName},{email}]
    })
    if(existingUser){
        throw new ApiError(409,"User Already Exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(404,"Avatar not found")
    }
    
    const coverImageLocalPath=req.files?.coverImage[0]?.path

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar not uploaded")
    }

    const user= await User.create({
        userName:userName.toLowerCase(),
        fullName,
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || ""
    })

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!userCreated){
        throw new ApiError(500,"Server Error: User not registered successfully")
    }

    return res.status(201).json(
        new ApiResponse(200,userCreated,"User Registered Successfully")
    )

})

export {
    registerUser,
}

//if exported like this the name can't be changed while importing