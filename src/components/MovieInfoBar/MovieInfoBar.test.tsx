import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MovieInfoBar from "./index";

describe("MovieInfoBar", () => {
  it("renders the running time via calcTime", () => {
    render(<MovieInfoBar time={142} budget={100000000} revenue={500000000} />);
    // calcTime(142) = "2h 22m"
    expect(screen.getByText("Running time: 2h 22m")).toBeInTheDocument();
  });

  it("renders the budget via convertMoney", () => {
    render(<MovieInfoBar time={120} budget={100000000} revenue={500000000} />);
    expect(screen.getByText("Budget: $100,000,000")).toBeInTheDocument();
  });

  it("renders the revenue via convertMoney", () => {
    render(<MovieInfoBar time={120} budget={100000000} revenue={500000000} />);
    expect(screen.getByText("Revenue: $500,000,000")).toBeInTheDocument();
  });

  it("renders zero budget and revenue as $0", () => {
    render(<MovieInfoBar time={120} budget={0} revenue={0} />);
    expect(screen.getByText("Budget: $0")).toBeInTheDocument();
    expect(screen.getByText("Revenue: $0")).toBeInTheDocument();
  });
});
