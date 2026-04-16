import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Grid from "./index";

describe("Grid", () => {
  it("renders the header text", () => {
    render(<Grid header="Popular Movies"><div /></Grid>);
    expect(screen.getByRole("heading", { name: "Popular Movies", level: 2 })).toBeInTheDocument();
  });

  it("renders children inside the grid", () => {
    render(
      <Grid header="Actors">
        <span>Actor One</span>
        <span>Actor Two</span>
      </Grid>,
    );
    expect(screen.getByText("Actor One")).toBeInTheDocument();
    expect(screen.getByText("Actor Two")).toBeInTheDocument();
  });
});
