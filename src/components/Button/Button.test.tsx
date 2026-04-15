import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./index";

describe("Button", () => {
  it("renders the button text", () => {
    render(<Button text="Load More" callback={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Load More" }),
    ).toBeInTheDocument();
  });

  it("calls callback when clicked", async () => {
    const callback = vi.fn();
    render(<Button text="Load More" callback={callback} />);
    await userEvent.click(screen.getByRole("button"));
    expect(callback).toHaveBeenCalledOnce();
  });
});
