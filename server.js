const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_API_KEY;
const SHEET_ID = "1eidScsjMV3-UxvfZ7zbUljk9mhz64H8vgbKWT3qBuwM";
const RANGE_1 = "HOUSE!C4:F5";
const RANGE_2 = "SCORES!A1:D200"; // Example of another sheet

// Enable CORS
app.use(cors());

app.get('', async (req, res) => {
    try {
        // URLs for both sheet ranges
        const url1 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE_1}?key=${API_KEY}`;
        const url2 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE_2}?key=${API_KEY}`;

        // Fetch data from both sheets concurrently
        const [response1, response2] = await Promise.all([
            fetch(url1).then(res => res.json()),
            fetch(url2).then(res => res.json())
        ]);

        // Combine results
        res.json({
            houseData: response1,
            scoreData: response2
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
