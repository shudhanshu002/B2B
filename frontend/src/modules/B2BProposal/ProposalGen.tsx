import React, { useState } from 'react';
import api from '../../api/axiosInstance';
import { FileText, DollarSign, Loader2 } from 'lucide-react';

export const ProposalGen = () => {
    const [loading, setLoading] = useState(false);
    const [proposal, setProposal] = useState<any>(null);

    const generate = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const body = Object.fromEntries(formData);

        try {
            const res = await api.post('/proposals/generate', body);
            setProposal(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200 mt-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="text-blue-600" size={20} />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">B2B Proposal Generator</h2>
            </div>
            <form onSubmit={generate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Client Name</label>
                    <input name="clientName" placeholder="Example: GreenTech Corp" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Industry</label>
                    <input name="industry" placeholder="Example: Hospitality" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-600">Budget Limit ($)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        <input
                            name="budgetLimit"
                            type="number"
                            placeholder="5000"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                </div>

                <button
                    disabled={loading}
                    className="md:col-span-2 flex items-center justify-center gap-2 bg-green-500 text-black py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-400"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={16} />
                            Calculating Mix...
                        </>
                    ) : (
                        'Generate Proposal'
                    )}
                </button>
            </form>
            {proposal && (
                <div className="mt-8 border-t pt-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Suggested Product Mix</h3>

                    <div className="overflow-hidden border rounded-lg">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600">
                                    <th className="text-left p-3 font-medium">Product</th>
                                    <th className="text-right p-3 font-medium">Quantity</th>
                                    <th className="text-right p-3 font-medium">Cost</th>
                                </tr>
                            </thead>

                            <tbody>
                                {proposal.suggestedProductMix.map((p: any, i: number) => (
                                    <tr key={i} className="border-t hover:bg-gray-50 transition">
                                        <td className="p-3">{p.productName}</td>
                                        <td className="p-3 text-right">{p.quantity}</td>
                                        <td className="p-3 text-right font-medium text-blue-600">${p.estimatedCost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <p className="italic text-gray-700 text-sm leading-relaxed">{proposal.impactPositioning}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
