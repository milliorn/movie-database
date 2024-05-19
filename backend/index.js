/**
 * // Read more about the API here: https://developers.themoviedb.org/
 */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

// Load environment variables from a .env file into process.env
dotenv.config();

// Create an Express application
const app = express();
// Get the port from the environment variables or use 3002 as default
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Get the API key from the environment variables
const API_KEY = process.env.API_KEY;

// The base URL for the API
const API_URL = "https://api.themoviedb.org/3/";

// The base URL for popular movies
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
//  The base URL for searching movies
const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=`;

// const AUTH_BASE_URL = `${API_URL}authentication/`;  // New base URL for authentication paths
// const LOGIN_URL = `${AUTH_BASE_URL}token/validate_with_login?api_key=${API_KEY}`;
// const REQUEST_TOKEN_URL = `${AUTH_BASE_URL}token/new?api_key=${API_KEY}`;
// const SESSION_ID_URL = `${AUTH_BASE_URL}session/new?api_key=${API_KEY}`;

app.get('/api/movies', async (req, res) => {
  const { searchTerm, page = 1 } = req.query;

  if (!searchTerm) {
    console.log(`Fetching popular movies for page: ${page}`);
  }
  else {
    console.log(`Fetching movies for search term: ${searchTerm}, page: ${page}`);
  }

  const url = searchTerm
    ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
    : `${POPULAR_BASE_URL}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Data received:', data);
    res.send(data);
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    res.status(500).send({ error: 'Failed to fetch movies' });
  }
})

app.get('/api/movie/:movieId', async (req, res) => {
  // Get the movieId from the URL parameters
  const { movieId } = req.params;

  console.log(`Fetching movie details for movie ID: ${movieId}`);

  const url = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

  try {
    // Fetch the data from the URL and wait for the response
    const response = await fetch(url);
    // Parse the JSON data from the response and send it back to the client as JSON data
    const data = await response.json();
    console.log('Data received:', data);
    // Send the data back to the client
    res.send(data);
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    res.status(500).send({ error: 'Failed to fetch movie details' });
  }
})

/**
 * Endpoint to fetch credits for a movie
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The movie credits data
 */
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
    // Log received data to the console
    console.log('Data received:', data);
    // Send the data back to the client
    res.send(data);
  } catch (error) {
    console.error('Failed to fetch movie credits:', error);
    res.status(500).send({ error: 'Failed to fetch movie credits' });
  }
});

/**
 * Endpoint to test the server
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {string} - The "Hello World!" message
 */
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Hello World running on http://localhost:${PORT}/hello`);
});
