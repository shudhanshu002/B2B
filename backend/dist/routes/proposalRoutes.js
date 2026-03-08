"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proposalController_1 = require("../controllers/proposalController");
const router = (0, express_1.Router)();
router.post('/generate', proposalController_1.createProposal);
exports.default = router;
//# sourceMappingURL=proposalRoutes.js.map