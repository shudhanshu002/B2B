import { Schema, model } from 'mongoose';

const ImpactReportSchema = new Schema({
  orderId: { type: String, required: true },
  clientName: { type: String },
  metrics: {
    plasticSavedKg: Number,
    carbonAvoidedKg: Number,
    treesEquivalent: Number
  },
  impactStatement: { type: String }, // ai-generated human-readable story
  localSourcingSummary: { type: String },
  generatedAt: { type: Date, default: Date.now }
});

export const ImpactReport = model('ImpactReport', ImpactReportSchema);