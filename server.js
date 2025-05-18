const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

// Serve static files from the current directory
app.use(express.static('public'));

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Endpoint
app.get('/api/random-word', async (req, res) => {
  try {
    const response = await axios.get('https://random-word-api.herokuapp.com/word?length=5');
    const word = response.data[0];
    res.json({ word });
  } catch (error) {
    console.error('Error fetching word:', error);
    res.status(500).json({ error: 'Failed to fetch word' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});