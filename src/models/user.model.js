import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        lowercase: true,
        trim:true,
        index:true,
        required: [true, "UserName is required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim:true,
        required: [true, "EmailId is required"]
    },
    fullName: {
        type: String,
        index:true,
        // trim:true,
        required: [true, "FullName is required"]
    },
    avatar: {
        type: String,
        required: [true, "Avatar is required"]
    },
    coverImage: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    },
    watchHistory : [
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ]
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password= bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id=this.id,
            userName=this.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        
    )
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id=this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}
export const User = mongoose.model("User", userSchema)