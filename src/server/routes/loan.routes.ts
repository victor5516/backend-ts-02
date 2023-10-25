import { Router } from "express";
import { verifyTokenMiddleware } from "../../middlewares/auth.middleware";
import { createLoan, refund, getLoans } from "../../controllers/loan.controller";


const middlewares = [verifyTokenMiddleware]

const router = Router();
router.get("/loan",middlewares, getLoans);
router.post("/loan",middlewares, createLoan);
router.put("/loan/refund/:id",middlewares, refund);

export default router;


