import { useState } from 'react';
import api from '../../api/axiosInstance';
import { BarChart3, Droplets, Wind, TreeDeciduous, Loader2 } from 'lucide-react';

export const ImpactDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<any>(null);

    const generateReport = async () => {
        setLoading(true);
        try {
            
            const products = [
                { productName: 'Bamboo Coffee Cups', quantity: 250 },
                { productName: 'Recycled Notebooks', quantity: 100 },
            ];
            const res = await api.post('/impact/generate', { orderId: 'ORD-' + Date.now(), products });
            setReport(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                    <BarChart3 className="text-emerald-600" size={20} />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Sustainability Impact Dashboard</h2>
            </div>

            {!report ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-500 mb-5">No sustainability report generated for this session.</p>

                    <button
                        onClick={generateReport}
                        disabled={loading}
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition disabled:bg-gray-400"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={16} />
                                Calculating Impact...
                            </>
                        ) : (
                            'Generate Impact Report'
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl text-center shadow-sm">
                            <Droplets className="mx-auto text-blue-600 mb-2" size={22} />
                            <span className="block text-3xl font-bold text-blue-900">{report.metrics.plasticSavedKg}kg</span>
                            <span className="text-xs text-blue-700 uppercase font-semibold tracking-wide">Plastic Saved</span>
                        </div>

                        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl text-center shadow-sm">
                            <Wind className="mx-auto text-gray-600 mb-2" size={22} />
                            <span className="block text-3xl font-bold text-gray-900">{report.metrics.carbonAvoidedKg}kg</span>
                            <span className="text-xs text-gray-700 uppercase font-semibold tracking-wide">CO₂ Avoided</span>
                        </div>

                        <div className="p-5 bg-green-50 border border-green-100 rounded-xl text-center shadow-sm">
                            <TreeDeciduous className="mx-auto text-green-600 mb-2" size={22} />
                            <span className="block text-3xl font-bold text-green-900">{report.metrics.treesEquivalent}</span>
                            <span className="text-xs text-green-700 uppercase font-semibold tracking-wide">Trees Equivalent</span>
                        </div>
                    </div>

                    <div className="p-5 border-l-4 border-emerald-500 bg-emerald-50 rounded-lg">
                        <p className="text-sm text-emerald-900 italic leading-relaxed">"{report.impactStatement}"</p>
                    </div>
                </div>
            )}
        </div>
    );
};
