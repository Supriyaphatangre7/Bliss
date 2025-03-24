import mongoose from "mongoose";

const buySchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  mobile: { type: String, required: true }, // User's mobile number
  address: { type: String, required: true }, // User's address
  payment: { type: String,  required: true }, // Payment type
 
});

const Buy = mongoose.model("buy", buySchema);

export default Buy;