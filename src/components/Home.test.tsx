import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useHomeFetch from "../hooks/useHomeFetch";
import { mockMovie } from "../test/handlers";
import { server } from "../test/server";
import Home from "./Home";

vi.mock("../hooks/useHomeFetch");

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
  vi.mocked(useHomeFetch).mockReturnValue(defaultHook);
  server.use(
    http.get("*/manifest.json", () =>
      HttpResponse.json({ name: "RMDB" }),
    ),
  );
});

afterEach(() => {
  vi.clearAllMocks();
});

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home", () => {
  it("renders ErrorView on error", () => {
    vi.mocked(useHomeFetch).mockReturnValue({
      ...defaultHook,
      error: true,
    });
    renderHome();
    expect(
      screen.getByText("Failed to load movies. Please try again."),
    ).toBeInTheDocument();
  });

  it("renders Spinner while loading", () => {
    vi.mocked(useHomeFetch).mockReturnValue({
      ...defaultHook,
      loading: true,
    });
    renderHome();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("shows Load More button when more pages are available", () => {
    vi.mocked(useHomeFetch).mockReturnValue({
      ...defaultHook,
      state: { page: 1, results: [], total_pages: 2, total_results: 4 },
    });
    renderHome();
    expect(
      screen.getByRole("button", { name: "Load More" }),
    ).toBeInTheDocument();
  });

  it("hides Load More button when on the last page", () => {
    renderHome();
    expect(
      screen.queryByRole("button", { name: "Load More" }),
    ).not.toBeInTheDocument();
  });

  it("clicking Load More calls setIsLoadingMore(true)", async () => {
    const user = userEvent.setup();
    vi.mocked(useHomeFetch).mockReturnValue({
      ...defaultHook,
      state: { page: 1, results: [], total_pages: 2, total_results: 4 },
    });
    renderHome();
    await user.click(screen.getByRole("button", { name: "Load More" }));
    expect(mockSetIsLoadingMore).toHaveBeenCalledWith(true);
  });

  it("shows 'Popular Movies' header when no search term", () => {
    renderHome();
    expect(screen.getByText("Popular Movies")).toBeInTheDocument();
  });

  it("shows 'Search Results' header when a search term is active", () => {
    vi.mocked(useHomeFetch).mockReturnValue({
      ...defaultHook,
      searchTerm: "batman",
    });
    renderHome();
    expect(screen.getByText("Search Results")).toBeInTheDocument();
  });

  it("sets document.title from manifest.json", async () => {
    renderHome();
    await waitFor(() => {
      expect(document.title).toBe("RMDB");
    });
  });

  it("handles manifest.json fetch failure gracefully", () => {
    server.use(
      http.get("*/manifest.json", () => HttpResponse.error()),
    );
    vi.spyOn(console, "error").mockImplementationOnce(vi.fn());
    renderHome();
    // Component still renders; failure is caught silently
    expect(screen.getByText("Popular Movies")).toBeInTheDocument();
  });

  it("renders Thumb components when results are present", () => {
    vi.mocked(useHomeFetch).mockReturnValue({
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
    renderHome();
    expect(screen.getByAltText("Movie A poster")).toBeInTheDocument();
    // Movie B has no poster_path — falls back to NoImage
    expect(screen.getByAltText("Movie B poster")).toBeInTheDocument();
  });
});
