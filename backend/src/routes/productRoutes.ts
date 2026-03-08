import { Router } from 'express';
import { processProductAI } from '../controllers/productController';


const router = Router();

router.post('/analyze', processProductAI);

export default router;