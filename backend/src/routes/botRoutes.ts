import { Router } from 'express';
import { handleWhatsAppWebhook } from '../controllers/botController';

const router = Router();

router.post('/whatsapp', handleWhatsAppWebhook);

export default router;