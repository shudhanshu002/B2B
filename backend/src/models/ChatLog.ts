import { Schema, model } from 'mongoose';

const ChatLogSchema = new Schema({
  waId: String, // WhatsApp ID
  message: String,
  aiResponse: String,
  status: { type: String, enum: ['resolved', 'escalated'], default: 'resolved' },
  timestamp: { type: Date, default: Date.now }
});

export const ChatLog = model('ChatLog', ChatLogSchema);