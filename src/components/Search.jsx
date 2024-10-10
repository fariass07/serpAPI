import { useState } from "react";
import axios from "axios";
import "../App.css";
export default function Search() {
  
  const [query, setQuery] = useState("");
  
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [results, setResults] = useState([]);

  
  const handleQuery = async (e) => {
    e.preventDefault();

    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`http://localhost:4000/search`, {
        params: {
          query,
        },
      });
      setResults(res.data.organic_results || []);
    } catch (err) {
      console.error(err.message);
      setError("Não foi possível fazer a busca");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="App">
        <div className="logo">
          <h1>Goggle</h1>
          <img id="goggle-logo" src="goggles.svg" alt="Goggles" />
        </div>
        <form onSubmit={handleQuery}>
          <label>
            Searc
            <input
              type="text"
              name="query"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              value={query}
            />
          </label>
          <button type="submit">Buscar</button>
        </form>

        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {results.map((result, index) => {
              return (
                <li key={index}>
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.title}
                  </a>
                  <p>{result.snippet}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
