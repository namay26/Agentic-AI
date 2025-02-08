const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/";

app.use(cors());
app.use(express.json());

app.get("/api/crypto/:endpoint", async (req, res) => {
  try {
    console.log(`Received request for endpoint: ${req.params.endpoint}`);
    console.log("Query parameters:", req.query);

    const { endpoint } = req.params;
    let apiUrl;

    switch (endpoint) {
      case "coins":
        apiUrl = `${COINGECKO_API_URL}/coins/list`;
        break;
      case "price":
        apiUrl = `${COINGECKO_API_URL}/simple/price`;
        break;
      case "history":
        apiUrl = `${COINGECKO_API_URL}/coins/${req.query.id}/market_chart`;
        break;
      default:
        return res.status(400).json({ error: "Invalid endpoint" });
    }

    const response = await axios.get(apiUrl, { params: req.query });

    console.log("CoinGecko response status:", response.status);
    console.log("CoinGecko response headers:", response.headers);
    console.log(
      "CoinGecko response data:",
      JSON.stringify(response.data, null, 2)
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error proxying request:", error.message);
    if (error.response) {
      console.error("CoinGecko error response:", error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
