import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import NowPlayingMovies from "./components/NowPlayingMovies";
import UpcomingMovies from "./components/UpcomingMovies";
import { GlobalStyle } from "./Global.styles";

/**
 * The main component of the movie database application.
 * Renders the header, routes, and global styles.
 *
 * @returns The JSX element representing the App component.
 */
function App(): React.JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:movieId" element={<Movie />} />
        <Route path="now_playing" element={<NowPlayingMovies />} />
        <Route path="upcoming" element={<UpcomingMovies />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </Router>
  );
}

export default App;
