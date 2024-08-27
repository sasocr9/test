const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { fields, sort, limit } = req.body;

      const response = await axios.post('https://api.igdb.com/v4/games', `
        fields ${fields};
        sort ${sort};
        limit ${limit};
      `, {
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${process.env.TWITCH_TOKEN}`,
          'Content-Type': 'text/plain'
        },
      });

      const games = response.data.map(game => ({
        name: game.name,
        coverUrl: game.cover ? game.cover.url : null,
        releaseDate: game.first_release_date
      }));
      res.status(200).json(games);
    } catch (error) {
      res.status(500).send('Error fetching data from IGDB');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
