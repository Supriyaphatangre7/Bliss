import Cart from "../models/cart-model.js";

// Get all carts
export const getAllCarts = async (req, res, next) => {
  try {
    const cart = await Cart.find({});
    if (!cart.length) {
      return res.status(404).json({ message: "No cart found" });
    }
    console.log(cart);
    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Delete cart by ID
export const deleteCartById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Cart.deleteOne({ _id: id });
    return res.status(200).json({ message: "Cart Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

export default { getAllCarts, deleteCartById };
