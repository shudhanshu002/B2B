import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analyze', path: '/analyze' },
    { name: 'Proposals', path: '/proposals' },
    { name: 'Impact', path: '/impact' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <nav className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-emerald-700 font-black text-2xl">
        <Leaf fill="currentColor" /> ECO-AI
      </Link>
      
      <div className="flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-semibold transition-colors ${
              location.pathname === link.path ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-500'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;