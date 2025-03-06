import { error } from "console"

const asyncHandler = (requestHandler)=> {
     return (req,res,next)=>{                                            //forgot to return
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>next(error))
    }
}

// const asyncHandler = (func) => async (req,res,next) => {
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

export {asyncHandler}