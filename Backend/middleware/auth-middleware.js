import User from "../models/user-model.js";
import jwt from "jsonwebtoken"



export const authMiddleware=async(req,res,next)=>{
    const token=req.header("Authorization");

    if(!token)
    {
        return res.status(401).json({message:"unauthorized http,token not provided"});
    }

    const jwtToken=token.replace("Bearer","").trim();
    console.log(jwtToken);

    try {

        const isVerfied=jwt.verify(jwtToken,process.env.secret_key);
        console.log(isVerfied);

        const userData=await User.findOne({email:isVerfied.email}).select({
            password:0,
        });

        req.token=token;
        req.user=userData;
        req.userId=userData._id;

        next();
        
    } catch (error) {
      return res.status(401).json({message:"unauthorized invalid token"});  
    }
};

export default authMiddleware;