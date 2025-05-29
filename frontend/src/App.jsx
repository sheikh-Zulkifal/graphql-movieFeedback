import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-900 text-white flex items-center px-6">
        <Link to="/">Home</Link>
        <Link to="/add">Add Movie</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMovie />} />
      </Routes>
    </Router>
  );
}
