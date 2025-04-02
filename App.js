import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuranReader from './QuranReader';
import SurahDetail from './SurahDetail';
import SurahPage from './SurahPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuranReader />} />
        <Route path="/surah/:id" element={<SurahDetail />} />
        <Route path="/surahPage/:id" element={<SurahPage />} />
      </Routes>
    </Router>
  );
};

export default App;
