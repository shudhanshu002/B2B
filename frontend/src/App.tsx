import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ProductForm } from './modules/CategoryGen/ProductForm';
import { ProposalGen } from './modules/B2BProposal/ProposalGen';
import { ImpactDashboard } from './modules/ImpactReport/ImpactDashboard';
import { ChatBot } from './modules/ChatSupport/ChatBot';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<ProductForm />} />
            <Route path="/proposals" element={<ProposalGen />} />
            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="/support" element={<ChatBot />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;