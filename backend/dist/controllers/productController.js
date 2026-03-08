"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProductAI = void 0;
const Product_1 = require("../models/Product");
const moduleOneService_1 = require("../services/moduleOneService");
const processProductAI = async (req, res) => {
    try {
        const { name, description } = req.body;
        const aiData = await (0, moduleOneService_1.categorizeProductAI)(name, description);
        const newProduct = await Product_1.Product.create({
            name,
            description,
            ...aiData
        });
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "AI Processing Failed" });
    }
};
exports.processProductAI = processProductAI;
//# sourceMappingURL=productController.js.map