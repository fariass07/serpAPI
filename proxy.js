import axios from 'axios';
import cors from 'cors';
import express from 'express';
const app = express();

const PORT = 4000;

app.use(cors());

app.get("/search", async (req, res) => {
  const { query } = req.query;
  const API_KEY =
    "ea05a442342e8aec705830c67c02f66cae5a3d573d0ddf6a9bdc0be9313f9732";
  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: query,
        engine: "google",
        google_domain: "google.com.br",
        api_key: API_KEY,
        hl: "pt-br",
        gl: "br",
        num: 10,
      },
    });
  res.json(response.data)
} catch{
  res.status(500).json({error: "Ocorreu um erro ao fazer a requisição à API."})
}
  });
    

  app.listen(PORT, () => {
    console.log(`Proxy rodando na porta ${PORT}`);
  });
