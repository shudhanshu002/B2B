"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const botController_1 = require("../controllers/botController");
const router = (0, express_1.Router)();
router.post('/whatsapp', botController_1.handleWhatsAppWebhook);
exports.default = router;
//# sourceMappingURL=botRoutes.js.map