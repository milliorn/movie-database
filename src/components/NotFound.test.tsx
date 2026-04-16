import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type * as ReactRouterDom from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import NotFound from "./NotFound";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof ReactRouterDom>("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
}

describe("NotFound", () => {
  it("renders the page not found title", () => {
    renderNotFound();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders the descriptive message", () => {
    renderNotFound();
    expect(
      screen.getByText(
        "The page you are looking for does not exist or may have been moved.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the Go back button", () => {
    renderNotFound();
    expect(
      screen.getByRole("button", { name: /go back/i }),
    ).toBeInTheDocument();
  });

  it("calls navigate(-1) when Go back is clicked", async () => {
    const user = userEvent.setup();
    renderNotFound();
    await user.click(screen.getByRole("button", { name: /go back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
