import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ErrorView from "./index";

function renderErrorView(props?: { message?: string }) {
  return render(
    <MemoryRouter>
      <ErrorView {...props} />
    </MemoryRouter>,
  );
}

describe("ErrorView", () => {
  it("renders the default message when none is provided", () => {
    renderErrorView();
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("renders a custom message when provided", () => {
    renderErrorView({ message: "Network failure." });
    expect(screen.getByText("Network failure.")).toBeInTheDocument();
  });

  it("renders the Try Again button", () => {
    renderErrorView();
    expect(
      screen.getByRole("button", { name: "Try Again" }),
    ).toBeInTheDocument();
  });

  it("calls window.location.reload when Try Again is clicked", async () => {
    const reload = vi.fn();
    vi.stubGlobal("location", { reload });

    const user = userEvent.setup();
    renderErrorView();
    await user.click(screen.getByRole("button", { name: "Try Again" }));
    expect(reload).toHaveBeenCalledOnce();
  });

  it("renders a Go Home link pointing to /", () => {
    renderErrorView();
    const goHome = screen.getByRole("link", { name: "Go Home" });
    expect(goHome).toBeInTheDocument();
    expect(goHome).toHaveAttribute("href", "/");
  });
});
