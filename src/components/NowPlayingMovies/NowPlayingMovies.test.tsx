import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import { mockMovie } from "../../test/handlers";
import NowPlayingMovies from "./index";

vi.mock("../../hooks/useNowPlayingMovies");

const mockSetSearchTerm = vi.fn();
const mockSetIsLoadingMore = vi.fn();

const defaultHook = {
  state: { page: 1, results: [], total_pages: 1, total_results: 0 },
  loading: false,
  error: false,
  searchTerm: "",
  setSearchTerm: mockSetSearchTerm,
  setIsLoadingMore: mockSetIsLoadingMore,
};

beforeEach(() => {
  vi.mocked(useNowPlayingMovies).mockReturnValue(defaultHook);
});

afterEach(() => {
  vi.clearAllMocks();
});

function renderNowPlayingMovies() {
  return render(
    <MemoryRouter>
      <NowPlayingMovies />
    </MemoryRouter>,
  );
}

describe("NowPlayingMovies", () => {
  it("renders ErrorView on error", () => {
    vi.mocked(useNowPlayingMovies).mockReturnValue({
      ...defaultHook,
      error: true,
    });
    renderNowPlayingMovies();
    expect(
      screen.getByText("Failed to load now playing movies. Please try again."),
    ).toBeInTheDocument();
  });

  it("renders Spinner while loading", () => {
    vi.mocked(useNowPlayingMovies).mockReturnValue({
      ...defaultHook,
      loading: true,
    });
    renderNowPlayingMovies();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("shows Load More button when more pages are available", () => {
    vi.mocked(useNowPlayingMovies).mockReturnValue({
      ...defaultHook,
      state: { page: 1, results: [], total_pages: 2, total_results: 4 },
    });
    renderNowPlayingMovies();
    expect(
      screen.getByRole("button", { name: "Load More" }),
    ).toBeInTheDocument();
  });

  it("hides Load More button when on the last page", () => {
    renderNowPlayingMovies();
    expect(
      screen.queryByRole("button", { name: "Load More" }),
    ).not.toBeInTheDocument();
  });

  it("clicking Load More calls setIsLoadingMore(true)", async () => {
    const user = userEvent.setup();
    vi.mocked(useNowPlayingMovies).mockReturnValue({
      ...defaultHook,
      state: { page: 1, results: [], total_pages: 2, total_results: 4 },
    });
    renderNowPlayingMovies();
    await user.click(screen.getByRole("button", { name: "Load More" }));
    expect(mockSetIsLoadingMore).toHaveBeenCalledWith(true);
  });

  it("shows 'Now Playing Movies' header when no search term", () => {
    renderNowPlayingMovies();
    expect(screen.getByText("Now Playing Movies")).toBeInTheDocument();
  });

  it("shows 'Search Results' header when a search term is active", () => {
    vi.mocked(useNowPlayingMovies).mockReturnValue({
      ...defaultHook,
      searchTerm: "batman",
    });
    renderNowPlayingMovies();
    expect(screen.getByText("Search Results")).toBeInTheDocument();
  });

  it("sets document.title to 'Now Playing Movies'", () => {
    renderNowPlayingMovies();
    expect(document.title).toBe("Now Playing Movies");
  });

  it("renders Thumb components when results are present", () => {
    vi.mocked(useNowPlayingMovies).mockReturnValue({
      ...defaultHook,
      state: {
        page: 1,
        total_pages: 1,
        total_results: 2,
        results: [
          { ...mockMovie, id: 1, title: "Movie A", poster_path: "/a.jpg" },
          { ...mockMovie, id: 2, title: "Movie B", poster_path: null },
        ],
      },
    });
    renderNowPlayingMovies();
    expect(screen.getByAltText("Movie A poster")).toBeInTheDocument();
    expect(screen.getByAltText("Movie B poster")).toBeInTheDocument();
  });
});
