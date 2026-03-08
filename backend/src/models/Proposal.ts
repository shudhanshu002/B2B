import {Schema, model, Types} from 'mongoose';

const ProposalSchema = new Schema({
  clientName: { type: String, required: true },
  budgetLimit: { type: Number, required: true },
  industry: { type: String, required: true },
  suggestedProductMix: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, 
    productName: { type: String },
    quantity: { type: Number },
    unitPrice: { type: Number },
    lineTotal: { type: Number }
  }],
  totalEstimatedCost: { type: Number },
  impactPositioning: { type: String },
  aiGeneratedAt: { type: Date, default: Date.now }
});

export const Proposal = model('Proposal', ProposalSchema);