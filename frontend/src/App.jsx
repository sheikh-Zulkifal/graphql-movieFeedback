import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-900 text-white flex items-center justify-between px-6 py-4 shadow-md">
        {/* Website Title */}
        <h1 className="text-2xl font-bold tracking-wide select-none">
          🎬 Movie Gallery
        </h1>

        {/* Navigation Links */}
        <div className="space-x-8 text-lg font-semibold">
          <Link
            to="/"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/add"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Add Movie
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMovie />} />
      </Routes>
    </Router>
  );
}
