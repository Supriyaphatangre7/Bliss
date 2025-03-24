import express from "express";
import { getAllCarts,  deleteCartById } from "../controllers/cartController.js";

const router = express.Router();

// Get all carts
router.get("/carts", getAllCarts);



// Delete cart by ID
router.delete("/carts/:id", deleteCartById);

export default router;