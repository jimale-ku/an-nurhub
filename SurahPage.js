import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SurahPage = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);

  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/surah/${id}/quran-uthmani`)
      .then(response => response.json())
      .then(data => setSurah(data.data));
  }, [id]);

  if (!surah) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  return (
    <div className="container bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-4">{surah.name}</h1>
      <Link to="/" className="text-blue-400 hover:underline">⬅ Back to Surah List</Link>
      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
        {surah.ayahs.map((ayah, index) => (
          <p key={ayah.number} className="text-lg leading-loose mb-4">
            {ayah.text} <span className="text-yellow-400 text-xl">({index + 1})</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SurahPage;