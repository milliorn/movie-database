import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useUpcomingMovies from "../../hooks/useUpcomingMovies";
import { mockMovie } from "../../test/handlers";
import UpcomingMovies from "./index";

vi.mock("../../hooks/useUpcomingMovies");

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
  vi.mocked(useUpcomingMovies).mockReturnValue(defaultHook);
});

afterEach(() => {
  vi.clearAllMocks();
});

function renderUpcomingMovies() {
  return render(
    <MemoryRouter>
      <UpcomingMovies />
    </MemoryRouter>,
  );
}

describe("UpcomingMovies", () => {
  it("renders ErrorView on error", () => {
    vi.mocked(useUpcomingMovies).mockReturnValue({
      ...defaultHook,
      error: true,
    });
    renderUpcomingMovies();
    expect(
      screen.getByText("Failed to load upcoming movies. Please try again."),
    ).toBeInTheDocument();
  });

  it("renders Spinner while loading", () => {
    vi.mocked(useUpcomingMovies).mockReturnValue({
      ...defaultHook,
      loading: true,
    });
    renderUpcomingMovies();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("shows Load More button when more pages are available", () => {
    vi.mocked(useUpcomingMovies).mockReturnValue({
      ...defaultHook,
      state: { page: 1, results: [], total_pages: 2, total_results: 4 },
    });
    renderUpcomingMovies();
    expect(
      screen.getByRole("button", { name: "Load More" }),
    ).toBeInTheDocument();
  });

  it("hides Load More button when on the last page", () => {
    renderUpcomingMovies();
    expect(
      screen.queryByRole("button", { name: "Load More" }),
    ).not.toBeInTheDocument();
  });

  it("clicking Load More calls setIsLoadingMore(true)", async () => {
    const user = userEvent.setup();
    vi.mocked(useUpcomingMovies).mockReturnValue({
      ...defaultHook,
      state: { page: 1, results: [], total_pages: 2, total_results: 4 },
    });
    renderUpcomingMovies();
    await user.click(screen.getByRole("button", { name: "Load More" }));
    expect(mockSetIsLoadingMore).toHaveBeenCalledWith(true);
  });

  it("shows 'Upcoming Movies' header when no search term", () => {
    renderUpcomingMovies();
    expect(screen.getByText("Upcoming Movies")).toBeInTheDocument();
  });

  it("shows 'Search Results' header when a search term is active", () => {
    vi.mocked(useUpcomingMovies).mockReturnValue({
      ...defaultHook,
      searchTerm: "batman",
    });
    renderUpcomingMovies();
    expect(screen.getByText("Search Results")).toBeInTheDocument();
  });

  it("sets document.title to 'Upcoming Movies'", () => {
    renderUpcomingMovies();
    expect(document.title).toBe("Upcoming Movies");
  });

  it("renders Thumb components when results are present", () => {
    vi.mocked(useUpcomingMovies).mockReturnValue({
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
    renderUpcomingMovies();
    expect(screen.getByAltText("Movie A poster")).toBeInTheDocument();
    expect(screen.getByAltText("Movie B poster")).toBeInTheDocument();
  });
});
