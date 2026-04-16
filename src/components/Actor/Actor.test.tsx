import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Actor from "./index";

function renderActor(overrides?: Partial<{ name: string; character: string; imageUrl: string }>) {
  const props = {
    name: "Actor One",
    character: "Hero",
    imageUrl: "/actor.jpg",
    ...overrides,
  };
  return render(<Actor {...props} />);
}

describe("Actor", () => {
  it("renders the actor name", () => {
    renderActor();
    expect(screen.getByText("Actor One")).toBeInTheDocument();
  });

  it("renders the character name", () => {
    renderActor();
    expect(screen.getByText("Hero")).toBeInTheDocument();
  });

  it("renders the actor image with alt text", () => {
    renderActor();
    const img = screen.getByAltText("actor-thumb");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/actor.jpg");
  });
});
