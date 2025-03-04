const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_API_KEY;
const SHEET_ID = "1eidScsjMV3-UxvfZ7zbUljk9mhz64H8vgbKWT3qBuwM";
const RANGE = "HOUSE!C4:F5";

// Enable CORS
app.use(cors());

app.get('', async (req, res) => {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
