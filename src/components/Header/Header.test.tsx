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
    expect(screen.getByRole("link", { name: "Now Playing" })).toHaveAttribute(
      "href",
      "/now_playing",
    );
    expect(screen.getByRole("link", { name: "Upcoming" })).toHaveAttribute(
      "href",
      "/upcoming",
    );
  });

  it("logo starts with aria-expanded false", () => {
    renderHeader();
    expect(screen.getByAltText("RMDB Logo")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("clicking the logo sets aria-expanded to true", async () => {
    const user = userEvent.setup();
    renderHeader();
    const logo = screen.getByAltText("RMDB Logo");
    await user.click(logo);
    expect(logo).toHaveAttribute("aria-expanded", "true");
  });

  it("clicking the logo twice sets aria-expanded back to false", async () => {
    const user = userEvent.setup();
    renderHeader();
    const logo = screen.getByAltText("RMDB Logo");
    await user.click(logo);
    await user.click(logo);
    expect(logo).toHaveAttribute("aria-expanded", "false");
  });

  it("clicking the Now Playing nav item closes the nav", async () => {
    const user = userEvent.setup();
    renderHeader();
    const logo = screen.getByAltText("RMDB Logo");
    await user.click(logo);
    await user.click(screen.getByRole("link", { name: "Now Playing" }));
    expect(logo).toHaveAttribute("aria-expanded", "false");
  });

  it("clicking the Popular nav item closes the nav", async () => {
    const user = userEvent.setup();
    renderHeader();
    const logo = screen.getByAltText("RMDB Logo");
    await user.click(logo);
    await user.click(screen.getByRole("link", { name: "Popular" }));
    expect(logo).toHaveAttribute("aria-expanded", "false");
  });

  it("clicking the Upcoming nav item closes the nav", async () => {
    const user = userEvent.setup();
    renderHeader();
    const logo = screen.getByAltText("RMDB Logo");
    await user.click(logo);
    await user.click(screen.getByRole("link", { name: "Upcoming" }));
    expect(logo).toHaveAttribute("aria-expanded", "false");
  });
});
