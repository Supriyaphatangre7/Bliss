import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: { type: [Number], required: true },
  quantity: { type: Number, required: true }, // Add quantity field
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
