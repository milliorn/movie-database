import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Thumb from "./index";

function renderThumb(props: React.ComponentProps<typeof Thumb>) {
  return render(
    <MemoryRouter>
      <Thumb {...props} />
    </MemoryRouter>,
  );
}

describe("Thumb", () => {
  it("renders the image with the movie title as alt text", () => {
    renderThumb({
      image: "/poster.jpg",
      clickable: false,
      movieTitle: "Inception",
    });
    expect(screen.getByAltText("Inception poster")).toBeInTheDocument();
  });

  it("uses a fallback alt text when no movieTitle is provided", () => {
    renderThumb({ image: "/poster.jpg", clickable: false });
    expect(screen.getByAltText("movie poster")).toBeInTheDocument();
  });

  it("wraps the image in a link when clickable and movieId are provided", () => {
    renderThumb({
      image: "/poster.jpg",
      clickable: true,
      movieId: 42,
      movieTitle: "Dune",
    });
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/42");
  });

  it("does not render a link when clickable is false", () => {
    renderThumb({ image: "/poster.jpg", clickable: false, movieId: 42 });
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("does not render a link when movieId is not provided", () => {
    renderThumb({ image: "/poster.jpg", clickable: true });
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders the rating", () => {
    renderThumb({ image: "/poster.jpg", clickable: false, rating: 7.5 });
    expect(screen.getByText("Rating: 7.5")).toBeInTheDocument();
  });

  it("renders the vote count", () => {
    renderThumb({ image: "/poster.jpg", clickable: false, vote_count: 1234 });
    expect(screen.getByText("👍 1234")).toBeInTheDocument();
  });
});
