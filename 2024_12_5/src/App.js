import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyIndex from './pages/myIndex';
import About from './pages/aboutUs';
import Contact from './pages/contact';

function App() {
  return (
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Strona główna</Link></li>
            <li><Link to="/about">O nas</Link></li>
            <li><Link to="/contact">Kontakt</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MyIndex />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
  );
}

export default App;