import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category/:category" element={<Dashboard />} />
        <Route path="/tag/:tag" element={<Dashboard />} />
        <Route path="/post/:slug" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
