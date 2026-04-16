import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type * as ReactRouterDom from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import BreadCrumb from "./index";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof ReactRouterDom>("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderBreadCrumb(movieTitle = "Test Movie") {
  return render(
    <MemoryRouter>
      <BreadCrumb movieTitle={movieTitle} />
    </MemoryRouter>,
  );
}

describe("BreadCrumb", () => {
  it("renders the movie title", () => {
    renderBreadCrumb("Inception");
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders the Previous Page button", () => {
    renderBreadCrumb();
    expect(
      screen.getByRole("button", { name: "Previous Page" }),
    ).toBeInTheDocument();
  });

  it("calls navigate(-1) when the back button is clicked", async () => {
    const user = userEvent.setup();
    renderBreadCrumb();
    await user.click(screen.getByRole("button", { name: "Previous Page" }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
