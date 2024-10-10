const express = require("express");
const axios = require("axios");
const cors = require("cors");
const PORT = 4000;

const app = express ();

app.use(cors());

app.get("/search", async (req, res) => 
  {

    const { query } = req.query;
    
    const URL = 'https://serpapi.com/search.json';
    const apiKey = 'a29c58189d329efd65cfa343ef9a0d99df0887e8177fe39a3e0285a6cfb14be1';
    
  try
  {
    const response = await axios.get(URL, {
      params: {
        q: query,
        api_key: apiKey,
        num: 10,
        engine: "google",
        google_domain: "google.com.br",
        gl: "br",
        h1: "pt-br"
      }
  });
  res.json(response.data)
} catch{
  res.status(500).json({error: "Ocorreu um erro ao fazer a requisição à API."})
}
  });
    

app.listen(PORT, () => (
  console.log(`O proxy está rodando na porta ${PORT}.`)
));
