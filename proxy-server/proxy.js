// proxy.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Replace these with your actual credentials
const TWITCH_CLIENT_ID = '3p42oiva3cn2fd2zvdkww1ory4h9uw';
const TWITCH_TOKEN = 'bdr6gkgtlyll7adizni59ryyaonvm2';

app.use(cors());
app.use(express.json()); // To parse JSON bodies

app.post('/api/games', async (req, res) => {
  try {
    const { fields, sort, limit } = req.body;
    
    const response = await axios.post('https://api.igdb.com/v4/games', `
      fields ${fields};
      sort ${sort};
      limit ${limit};
    `, {
      headers: {
        'Accept': 'application/json',
        'Client-ID': TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${TWITCH_TOKEN}`,
        'Content-Type': 'text/plain'
      },
    });
    
    // Extract and format the response data as needed
    const games = response.data.map(game => ({
      name: game.name,
      coverUrl: game.cover ? game.cover.url : null,
      releaseDate: game.first_release_date
    }));
    res.json(games);
  } catch (error) {
    res.status(500).send('Error fetching data from IGDB');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
