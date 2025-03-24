import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
});

userSchema.methods.generateToken=async function(){
    try {
        return jwt.sign(
          {
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
          },
          process.env.secret_key,
          {
            expiresIn: "30d",
          }
        );
      } catch (error) 
      {
        console.error("Token Error: ", error);
      }
    
    }

const User=new mongoose.model("user",userSchema);

export default User;