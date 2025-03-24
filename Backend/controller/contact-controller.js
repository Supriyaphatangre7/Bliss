import Contact from "../models/contact-model.js";

export const contact=async(req,res)=>{
    try {
        const response=req.body;
        await Contact.create(response);
        return res.status(200).json({message:"Message send successfully"})


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Message not delivered"})
    }
}

export default contact;