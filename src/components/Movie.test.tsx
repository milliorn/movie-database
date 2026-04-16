import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useMovieFetch from "../hooks/useMoviesFetch";
import { mockMovie, mockCredits } from "../test/handlers";
import Movie from "./Movie";

vi.mock("../hooks/useMoviesFetch");

const mockMovieState = {
  ...mockMovie,
  actors: mockCredits.cast,
  directors: mockCredits.crew.filter((c) => c.job === "Director"),
};

const defaultHook = { state: null, loading: false, error: false };

beforeEach(() => {
  vi.mocked(useMovieFetch).mockReturnValue(defaultHook);
});

function renderMovie(movieId: string) {
  return render(
    <MemoryRouter initialEntries={[`/${movieId}`]}>
      <Routes>
        <Route path="/:movieId" element={<Movie />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Movie", () => {
  it("renders NotFound for a non-numeric movieId", () => {
    renderMovie("abc");
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders NotFound for an empty movieId", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Movie />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders Spinner while loading", () => {
    vi.mocked(useMovieFetch).mockReturnValue({
      ...defaultHook,
      loading: true,
    });
    renderMovie("123");
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders ErrorView on error", () => {
    vi.mocked(useMovieFetch).mockReturnValue({
      ...defaultHook,
      error: true,
    });
    renderMovie("123");
    expect(
      screen.getByText("Failed to load movie details. Please try again."),
    ).toBeInTheDocument();
  });

  it("renders ErrorView when movie is not found", () => {
    renderMovie("123");
    expect(screen.getByText("Movie not found.")).toBeInTheDocument();
  });

  it("renders movie details for a valid numeric movieId", () => {
    vi.mocked(useMovieFetch).mockReturnValue({
      ...defaultHook,
      state: mockMovieState,
    });
    renderMovie("123");
    expect(screen.getByRole("heading", { name: "Test Movie", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Just a test.")).toBeInTheDocument();
    expect(screen.getByText("A test movie overview.")).toBeInTheDocument();
  });

  it("renders the Actors grid heading for a valid movie", () => {
    vi.mocked(useMovieFetch).mockReturnValue({
      ...defaultHook,
      state: mockMovieState,
    });
    renderMovie("123");
    expect(screen.getByText("Actors")).toBeInTheDocument();
  });

  it("renders actor image from profile_path when present", () => {
    vi.mocked(useMovieFetch).mockReturnValue({
      ...defaultHook,
      state: {
        ...mockMovieState,
        actors: [
          {
            credit_id: "abc",
            name: "Actor With Photo",
            character: "Hero",
            profile_path: "/actor.jpg",
          },
        ],
      },
    });
    renderMovie("123");
    const imgs = screen.getAllByAltText("actor-thumb");
    expect(imgs.some((img) => (img as HTMLImageElement).src.includes("/actor.jpg"))).toBe(true);
  });
});
