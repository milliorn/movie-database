import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { mockMovie } from "../../test/handlers";
import type { MovieState } from "../../hooks/props";
import MovieInfo from "./index";

const baseMovie: MovieState = {
  ...mockMovie,
  actors: [],
  directors: [{ credit_id: 1, job: "Director", name: "Director One" }],
};

function renderMovieInfo(movie: MovieState = baseMovie) {
  return render(
    <MemoryRouter>
      <MovieInfo movie={movie} />
    </MemoryRouter>,
  );
}

describe("MovieInfo", () => {
  it("renders the movie title", () => {
    renderMovieInfo();
    expect(screen.getByRole("heading", { name: "Test Movie", level: 1 })).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    renderMovieInfo();
    expect(screen.getByText("Just a test.")).toBeInTheDocument();
  });

  it("renders the overview", () => {
    renderMovieInfo();
    expect(screen.getByText("A test movie overview.")).toBeInTheDocument();
  });

  it("renders the director name", () => {
    renderMovieInfo();
    expect(screen.getByText("Director One")).toBeInTheDocument();
  });

  it("renders the release date", () => {
    renderMovieInfo();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
  });

  it("renders the vote average", () => {
    renderMovieInfo();
    expect(screen.getByText("8/10")).toBeInTheDocument();
  });

  it("renders a production company logo when logo_path is present", () => {
    const movieWithCompany: MovieState = {
      ...baseMovie,
      production_companies: [
        { id: 1, name: "Test Studios", logo_path: "/logo.png" },
      ],
    };
    renderMovieInfo(movieWithCompany);
    expect(screen.getByAltText("Test Studios")).toBeInTheDocument();
  });

  it("does not render an img for a company with no logo_path", () => {
    const movieWithCompany: MovieState = {
      ...baseMovie,
      production_companies: [
        { id: 1, name: "No Logo Studios", logo_path: null },
      ],
    };
    renderMovieInfo(movieWithCompany);
    expect(screen.queryByAltText("No Logo Studios")).not.toBeInTheDocument();
  });
});
