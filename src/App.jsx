// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const requestBody = {
          fields: 'age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites',
          sort: 'first_release_date desc',
          limit: 20
        };

        const response = await axios.post('http://localhost:5000/api/games', requestBody);
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch games');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Latest Released Games</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            {game.coverUrl ? <img src={game.coverUrl} alt={game.name} width="100" /> : null}
            <div>{game.name}</div>
            <div>{game.releaseDate ? new Date(game.releaseDate * 1000).toLocaleDateString() : 'N/A'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
