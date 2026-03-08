import { Router } from "express";
import { createProposal } from "../controllers/proposalController";

const router = Router();

router.post('/generate', createProposal);

export default router;