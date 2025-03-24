import User from "../models/user-model.js";
import bcrypt from "bcrypt"


export const register=async(req,res)=>{
  try {

    const {username,email,password}=req.body;
    
    const userExist= await User.findOne({ email });
    if(userExist)
    {
        return res.status(400).json({message:"email already exist"})
    }
    const salt=10;
    const hash=await bcrypt.hash(password,salt)

    const userCreated=await User.create({username,email,password:hash})
    return res.status(200).json({message:"user created successfully",token:await userCreated.generateToken(),userId:userCreated._id.toString()})
    
  } catch ( error) {
    console.log(error)
     return res.status(500).json({message:" Internal server error"})
      
  }
};


export const login=async(req,res)=>{
  try {
     const {email,password}=req.body;
     const userExist=await User.findOne({email});
     if(!userExist)
     {
       return res.status(400).json({message:"Invalid creditianls"})
     }
     
     const user=await bcrypt.compare(password,userExist.password)
     if(user)
     {
      return res.status(200).json({message:"user login successfully",token:await userExist.generateToken(),userId:userExist._id.toString()})
     }
     else
     {
       return res.status(201).json({message:"email and password is incorrect"})
     }

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal server error"})

  }
}


export const user=async(req,res)=>{
  try {
      const userData=req.user;
      console.log(userData);
      return res.status(200).json({userData})
      
  } catch (error) {
    console.log(error)
      next(error)
  }
}

export default {register,login,user}