import type { Request, Response } from "express";
import { Product } from "../models/Product";
import { categorizeProductAI } from "../services/moduleOneService";

export const processProductAI = async(req: Request, res: Response) => {
    try {
        const {name, description} = req.body;

        const aiData = await categorizeProductAI(name, description);

        const newProduct = await Product.create({
            name,
            description,
            ...aiData
        });

        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
    res.status(500).json({ success: false, message: "AI Processing Failed" });
  }
}