// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MyStylistPage from './pages/MyStylistPage';
import MinisPage from './pages/MinisPage';

const App = () => (
  <Router>
    <GlobalStyle />
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mystylist" element={<MyStylistPage />} />
      <Route path="/minis" element={<MinisPage />} />
    </Routes>
  </Router>
);

export default App;