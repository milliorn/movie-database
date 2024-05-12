import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

dotenv.config(); // Load environment variables from a .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3002; // Get the port from the environment variables
app.use(cors()); // This will enable CORS for all routes and origins

// TMDB API Configuration
const API_KEY = process.env.API_KEY; // Make sure to set this in your backend .env
const API_URL = "https://api.themoviedb.org/3/";

app.get('/api/credits/:movieId', async (req, res) => {
  // Get the movieId from the URL parameters
  const { movieId } = req.params;

  console.log(`Fetching credits for movie ID: ${movieId}`);

  // Construct the URL to fetch the credits for a movie
  const url = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

  try {
    // Fetch the data from the URL and wait for the response
    const response = await fetch(url);
    // Parse the JSON data from the response and send it back to the client as JSON data 
    const data = await response.json();
    console.log('Data received:', data);  // Log received data to the console
    res.send(data);
  } catch (error) {
    console.error('Failed to fetch movie credits:', error);
    res.status(500).send({ error: 'Failed to fetch movie credits' });
  }
})

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Hello World running on http://localhost:${PORT}/hello`)
});
