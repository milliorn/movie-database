import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroImage from "./index";

describe("HeroImage", () => {
  it("renders the title", () => {
    render(<HeroImage title="Inception" text="A dream within a dream." image="/backdrop.jpg" />);
    expect(screen.getByRole("heading", { name: "Inception", level: 1 })).toBeInTheDocument();
  });

  it("renders the overview text", () => {
    render(<HeroImage title="Inception" text="A dream within a dream." image="/backdrop.jpg" />);
    expect(screen.getByText("A dream within a dream.")).toBeInTheDocument();
  });

  it("renders the background image when an image URL is provided", () => {
    render(<HeroImage title="Inception" text="Overview" image="/backdrop.jpg" />);
    const img = screen.getByRole("presentation", { hidden: true });
    expect(img).toHaveAttribute("src", "/backdrop.jpg");
  });

  it("does not render the background image when image is an empty string", () => {
    render(<HeroImage title="Inception" text="Overview" image="" />);
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });
});
