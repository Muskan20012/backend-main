import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser=asyncHandler(async (req,res) => {
    res.status(200).json({
        message:"ok"
    })
})

export {
    registerUser,
}

//if exported like this the name can't be changed while importing