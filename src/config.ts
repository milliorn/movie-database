const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

enum ImageSizes {
  Small = "w300",
  Medium = "w780",
  Large = "w1280",
  Original = "original"
}

const BACKDROP_SIZE = ImageSizes.Large;
const POSTER_SIZE = ImageSizes.Medium;

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

export {
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKEND_API_URL
};
