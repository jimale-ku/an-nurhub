import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arabicTitle from "./bismillah.jpg"; // Your Arabic text image

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) {
          throw new Error("Failed to fetch surahs");
        }
        const data = await response.json();
        setSurahs(data.data);
        setFilteredSurahs(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSurahs();
  }, []);

  useEffect(() => {
    setFilteredSurahs(
      surahs.filter((surah) =>
        surah.englishName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, surahs]);

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      {/* Arabic Image Title */}
      <img
        src={arabicTitle}
        alt="Quran Title"
        className="w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto mb-6"
      />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Surah..."
        className="p-2 w-3/4 mb-4 rounded-lg text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-4">
        {filteredSurahs.map((surah) => (
          <Link
            key={surah.number}
            to={`/surah/${surah.number}`}
            className="text-lg font-semibold hover:text-yellow-400 text-center"
          >
            {surah.englishName}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SurahList;
