import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./components/Header", () => ({ default: () => null }));
vi.mock("./components/Home", () => ({
  default: () => <div>Home Page</div>,
}));
vi.mock("./components/Movie", () => ({
  default: () => <div>Movie Page</div>,
}));
vi.mock("./components/NowPlayingMovies", () => ({
  default: () => <div>Now Playing Page</div>,
}));
vi.mock("./components/UpcomingMovies", () => ({
  default: () => <div>Upcoming Page</div>,
}));
vi.mock("./components/NotFound", () => ({
  default: () => <div>Not Found Page</div>,
}));

afterEach(() => {
  window.history.pushState({}, "", "/");
});

function navigate(path: string) {
  window.history.pushState({}, "", path);
}

describe("App routing", () => {
  it("renders Home at /", () => {
    navigate("/");
    render(<App />);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders Movie at /:movieId", () => {
    navigate("/123");
    render(<App />);
    expect(screen.getByText("Movie Page")).toBeInTheDocument();
  });

  it("renders NowPlayingMovies at /now_playing", () => {
    navigate("/now_playing");
    render(<App />);
    expect(screen.getByText("Now Playing Page")).toBeInTheDocument();
  });

  it("renders UpcomingMovies at /upcoming", () => {
    navigate("/upcoming");
    render(<App />);
    expect(screen.getByText("Upcoming Page")).toBeInTheDocument();
  });

  it("renders NotFound for an unknown route", () => {
    navigate("/this/does/not/exist");
    render(<App />);
    expect(screen.getByText("Not Found Page")).toBeInTheDocument();
  });
});
