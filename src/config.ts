/**
 * The base URL for retrieving movie images from the TMDB API.
 */
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

/**
 * Enum representing different image sizes available for movie images.
 */
enum ImageSizes {
  Small = "w200",
  Medium = "w780",
  Large = "w1280",
  Original = "original",
}

/**
 * The size of the backdrop image to be used.
 */
const BACKDROP_SIZE = ImageSizes.Large;

/**
 * The size of the poster image to be used.
 */
const POSTER_SIZE = ImageSizes.Medium;

const COMPANY_POSTER_SIZE = ImageSizes.Small;
/**
 * The URL for the backend API.
 */
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

export {
  BACKDROP_SIZE,
  BACKEND_API_URL,
  COMPANY_POSTER_SIZE,
  IMAGE_BASE_URL,
  POSTER_SIZE,
};
