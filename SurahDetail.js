import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SurahDetail = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bismillah, setBismillah] = useState("");
  const [currentAyah, setCurrentAyah] = useState(0); // Track the current ayah index

  useEffect(() => {
    if (!id) {
      setError("Surah ID is missing.");
      setLoading(false);
      return;
    }

    const fetchSurah = async () => {
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${id}`
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const ayahs = data.data.ayahs;

        if (ayahs[0].text.startsWith("بِسْمِ اللَّهِ الرَّحْمَٰنِ ٱلرَّحِيمِ")) {
          setBismillah("بِسْمِ اللَّهِ الرَّحْمَٰنِ ٱلرَّحِيمِ");
          ayahs[0].text = ayahs[0].text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ ٱلرَّحِيمِ", "").trim();
        }

        setSurah({ ...data.data, ayahs });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [id]);

  // Highlight the current ayah with a special style
  const getAyahClass = (index) => {
    return index === currentAyah
      ? "bg-yellow-200 text-black" // Highlight the current ayah
      : "text-gray-700"; // Normal style for others
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!surah) return <p className="text-center">No data found.</p>;

  return (
    <div className="container min-h-screen p-6 bg-gray-100">
      <div className="mb-4">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Title and Surah Details */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {surah.englishName} ({surah.name})
        </h1>
        <p className="text-lg text-gray-700">📍 {surah.revelationType}</p>
      </div>

      {/* Bismillah */}
      {bismillah && (
        <p className="arabic-font text-center text-3xl font-bold mb-4">
          {bismillah}
        </p>
      )}

      {/* Ayah List */}
      <div className="overflow-auto max-h-[600px] p-6 bg-white bg-opacity-80 rounded-lg shadow-md">
        <div className="mt-6 space-y-4">
          {surah.ayahs.map((ayah, index) => (
            <div
              key={ayah.number}
              onClick={() => setCurrentAyah(index)} // Select the clicked Ayah
              className={`p-4 rounded-lg shadow cursor-pointer text-center ${getAyahClass(index)}`}
            >
              <p className="arabic-font text-2xl">
                {ayah.text}{" "}
                <span className="text-green-500">
                  ({ayah.numberInSurah.toLocaleString("ar-EG")})
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurahDetail;
