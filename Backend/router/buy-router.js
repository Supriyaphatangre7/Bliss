import express from "express";
import buyOrder from "../controller/buy-controller.js";

const buyRouter = express.Router();


buyRouter.post("/buy/:id", buyOrder); 

export default buyRouter;