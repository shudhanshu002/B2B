import React, { useState } from 'react';
import api from '../../api/axiosInstance';
import { Leaf, Search, Tag, Loader2 } from 'lucide-react';

export const ProductForm = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [input, setInput] = useState({ name: '', description: '' });

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/products/analyze', input);
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-ecoGreen-100 rounded-lg">
                    <Search className="text-ecoGreen-600" size={20} />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">AI Product Categorization</h2>
            </div>
            <form onSubmit={handleAnalyze} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Product Name</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecoGreen-400 focus:outline-none"
                        placeholder="Example: Bamboo Toothbrush"
                        onChange={(e) => setInput({ ...input, name: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecoGreen-400 focus:outline-none"
                        placeholder="Describe the product features and materials..."
                        onChange={(e) => setInput({ ...input, description: e.target.value })}
                    />
                </div>

                <button
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 text-black py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-400"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={16} />
                            Analyzing Product...
                        </>
                    ) : (
                        <>
                            <Leaf size={16} />
                            Generate AI Tags
                        </>
                    )}
                </button>
            </form>
            {data && (
                <div className="mt-6 p-4 bg-ecoGreen-50 border border-ecoGreen-100 rounded-xl animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-ecoGreen-700">{data.category}</span>
                        <span className="text-xs bg-white border px-2 py-1 rounded-md text-gray-500">{data.subCategory}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {data.seoTags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-white border text-xs rounded-full flex items-center gap-1 shadow-sm">
                                <Tag size={12} />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
