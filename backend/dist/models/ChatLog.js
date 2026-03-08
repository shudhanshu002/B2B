"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLog = void 0;
const mongoose_1 = require("mongoose");
const ChatLogSchema = new mongoose_1.Schema({
    waId: String, // WhatsApp ID
    message: String,
    aiResponse: String,
    status: { type: String, enum: ['resolved', 'escalated'], default: 'resolved' },
    timestamp: { type: Date, default: Date.now }
});
exports.ChatLog = (0, mongoose_1.model)('ChatLog', ChatLogSchema);
//# sourceMappingURL=ChatLog.js.map