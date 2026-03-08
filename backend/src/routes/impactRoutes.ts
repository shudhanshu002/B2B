import { Router } from 'express';
import { createImpactReport } from '../controllers/impactController';

const router = Router();

router.post('/generate', createImpactReport);

export default router;