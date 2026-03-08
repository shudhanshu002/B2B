import { Request, Response } from 'express';
import { ImpactReport } from '../models/ImpactReport';
import { callNvidiaJSON } from '../services/aiService';

export const createImpactReport = async (req: Request, res: Response) => {
  try {
    const { orderId, products } = req.body; // products which --> is an array of {name, qty}

    const prompt = `
      Estimate environmental impact for: ${JSON.stringify(products)}.
      Calculate plastic saved (kg), carbon avoided (kg), and tree equivalents.
      Write a 2-sentence impactStatement.
      Return JSON: { "metrics": { "plasticSavedKg": 0, "carbonAvoidedKg": 0, "treesEquivalent": 0 }, "impactStatement": "", "localSourcingSummary": "" }
    `;

    const aiImpact = await callNvidiaJSON(prompt);
    const report = await ImpactReport.create({ orderId, ...aiImpact });

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: "Impact Report Failed" });
  }
};