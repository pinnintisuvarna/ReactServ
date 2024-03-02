// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./Db'); // Assuming Db.js contains the database logic

const app = express();
app.use(bodyParser.json());
app.use(cors());

// API endpoint to fetch records
app.get('/api/records', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Parse the page parameter from the query string
    const records = await db.getRecords(page);
    res.json(records);
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'An error occurred while fetching records' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
