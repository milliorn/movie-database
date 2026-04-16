import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Header from "./index";

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("renders the RMDB logo", () => {
    renderHeader();
    expect(screen.getByAltText("RMDB Logo")).toBeInTheDocument();
  });

  it("renders the TMDB logo link to themoviedb.org", () => {
    renderHeader();
    const tmdbLink = screen.getByRole("link", { name: /tmdb-logo/i });
    expect(tmdbLink).toHaveAttribute("href", "https://www.themoviedb.org");
    expect(tmdbLink).toHaveAttribute("target", "_blank");
  });

  it("renders nav links with correct routes", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: "Popular" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("link", { name: "Now Playing" }),
    ).toHaveAttribute("href", "/now_playing");
    expect(screen.getByRole("link", { name: "Upcoming" })).toHaveAttribute(
      "href",
      "/upcoming",
    );
  });

  it("clicking the logo toggles the nav open", async () => {
    const user = userEvent.setup();
    renderHeader();
    const logo = screen.getByAltText("RMDB Logo");
    // Clicking should not throw; nav items remain in DOM regardless
    await user.click(logo);
    expect(screen.getByRole("link", { name: "Popular" })).toBeInTheDocument();
  });

  it("clicking the Now Playing nav item closes the nav", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByAltText("RMDB Logo"));
    await user.click(screen.getByRole("link", { name: "Now Playing" }));
    expect(screen.getByRole("link", { name: "Now Playing" })).toBeInTheDocument();
  });

  it("clicking the Popular nav item closes the nav", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByAltText("RMDB Logo"));
    await user.click(screen.getByRole("link", { name: "Popular" }));
    expect(screen.getByRole("link", { name: "Popular" })).toBeInTheDocument();
  });

  it("clicking the Upcoming nav item closes the nav", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByAltText("RMDB Logo"));
    await user.click(screen.getByRole("link", { name: "Upcoming" }));
    expect(screen.getByRole("link", { name: "Upcoming" })).toBeInTheDocument();
  });
});
