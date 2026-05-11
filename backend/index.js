const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

//
// QUIZ GLOBAL
//
app.get("/api/quiz/global", async (req, res) => {
  try {
    const { amount = 10, category } = req.query;

    let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;

    if (category) {
      url += `&category=${category}`;
    }

    const response = await axios.get(url);

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil quiz global",
    });
  }
});

//
// QUIZ INDONESIA
//
app.get("/api/quiz/indonesia", (req, res) => {
  try {
    const { category = "umum" } = req.query;

    const filePath = path.join(__dirname, "data", `${category}.json`);

    const data = fs.readFileSync(filePath, "utf-8");

    const questions = JSON.parse(data);

    res.json({
      results: questions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil quiz Indonesia",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});
