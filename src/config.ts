// Configuration for TMDB API
// Read more about the API here: https://developers.themoviedb.org/

const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
const API_URL = "https://api.themoviedb.org/3/";

const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=`;

// For login and voting
const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
const AUTH_BASE_URL = `${API_URL}authentication/`;  // New base URL for authentication paths

const LOGIN_URL = `${AUTH_BASE_URL}token/validate_with_login?api_key=${API_KEY}`;
const REQUEST_TOKEN_URL = `${AUTH_BASE_URL}token/new?api_key=${API_KEY}`;
const SESSION_ID_URL = `${AUTH_BASE_URL}session/new?api_key=${API_KEY}`;

enum ImageSizes {
  Small = "w300",
  Medium = "w780",
  Large = "w1280",
  Original = "original"
}

const BACKDROP_SIZE = ImageSizes.Large;
const POSTER_SIZE = ImageSizes.Medium;

export {
  API_KEY,
  API_URL,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  LOGIN_URL,
  POPULAR_BASE_URL,
  POSTER_SIZE,
  REQUEST_TOKEN_URL,
  SEARCH_BASE_URL,
  SESSION_ID_URL,
};
