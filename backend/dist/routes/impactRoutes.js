"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const impactController_1 = require("../controllers/impactController");
const router = (0, express_1.Router)();
router.post('/generate', impactController_1.createImpactReport);
exports.default = router;
//# sourceMappingURL=impactRoutes.js.map