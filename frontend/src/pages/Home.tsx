import { Link } from 'react-router-dom';
import { Zap, BarChart, MessageSquare, ShieldCheck } from 'lucide-react';

const IntroHome = () => {
  return (
    <div className="animate-fade-in space-y-12 py-10">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-black text-emerald-800 tracking-tight">
          Welcome to <span className="text-emerald-500">Eco-AI Suite</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The world's first AI-driven operations hub for sustainable businesses. 
          Automate your catalog, sales, and impact reporting in one place.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureLink 
          to="/analyze" 
          icon={<Zap className="text-yellow-500" />} 
          title="AI Cataloging" 
          desc="Auto-generate SEO tags and categories for your eco-products."
        />
        <FeatureLink 
          to="/proposals" 
          icon={<ShieldCheck className="text-blue-500" />} 
          title="B2B Proposals" 
          desc="Create budget-accurate sustainable product mixes for clients."
        />
        <FeatureLink 
          to="/impact" 
          icon={<BarChart className="text-emerald-500" />} 
          title="Impact Metrics" 
          desc="Calculate carbon avoided and plastic saved for every order."
        />
        <FeatureLink 
          to="/support" 
          icon={<MessageSquare className="text-purple-500" />} 
          title="Support Bot" 
          desc="24/7 AI chat with automated refund escalation logic."
        />
      </div>
    </div>
  );
};

const FeatureLink = ({ to, icon, title, desc }: any) => (
  <Link to={to} className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-emerald-50 transition-colors">{icon}</div>
      <div>
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  </Link>
);

export default IntroHome;