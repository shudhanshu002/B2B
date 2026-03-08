import { Request, Response } from 'express';
import { ChatLog } from '../models/ChatLog';
import { getBotResponse } from '../services/moduleFourService';

export const handleWhatsAppWebhook = async (req: Request, res: Response) => {
  try {
    // Check if Postman is sending "from" and "message"
    const { from, message } = req.body;

    if (!from || !message) {
      return res.status(400).json({ success: false, message: "Missing 'from' or 'message' in body" });
    }

    // 1. Get AI response from dedicated service
    const aiResult = await getBotResponse(message);

    // 2. Log to Database (Crucial for Technical Requirement #2)
    const log = await ChatLog.create({
      waId: from,
      message: message,
      aiResponse: aiResult.reply,
      status: aiResult.shouldEscalate ? 'escalated' : 'resolved'
    });

    res.status(200).json({ 
      success: true, 
      reply: aiResult.reply, 
      shouldEscalate: aiResult.shouldEscalate 
    });
  } catch (error) {
    console.error("Bot Error:", error);
    res.status(500).json({ success: false, message: "Bot processing failed" });
  }
};