import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.mongodb)
        console.log("connection successful");
    } catch (error) {
        console.log("connection unsuccessful");
        console.log(error);
    }
}

export default connectDb;