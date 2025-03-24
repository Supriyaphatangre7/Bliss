import express from "express"
import {fashion} from "../controller/fashion-controller.js"
import { getFashionById } from "../controller/fashion-controller.js";

const router=express.Router();

router.route("/fashion").get(fashion);
router.route("/fashion/:id").get(getFashionById);

export default router;