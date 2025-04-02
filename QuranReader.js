import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./kaaba.jpg";
import { FaMicrophone } from "react-icons/fa";

const QuranReader = () => {
  const [surahs, setSurahs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) {
          throw new Error("Failed to fetch Surahs");
        }
        const data = await response.json();
        setSurahs(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSurahs();
  }, []);

  const startVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };
  };

  const filteredSurahs = surahs.filter((surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
      <div style={{ position: "relative", textAlign: "center", color: "white", width: "90%", maxWidth: "500px" }}>
        <div style={{ display: "flex", alignItems: "center", backgroundColor: "white", padding: "10px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <input
            type="text"
            placeholder="Search Surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flexGrow: 1, padding: "10px", border: "none", outline: "none", color: "black" }}
          />
          <button onClick={startVoiceSearch} style={{ padding: "10px", backgroundColor: "blue", color: "white", borderRadius: "50%", border: "none" }}>
            <FaMicrophone size={20} />
          </button>
        </div>
        <ul style={{ marginTop: "20px", listStyle: "none", padding: 0, textAlign: "center" }}>
          {filteredSurahs.map((surah) => (
            <li key={surah.number}>
              <Link to={`/surah/${surah.number}`} style={{ color: "white", textDecoration: "none" }}>
                {surah.englishName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuranReader;
