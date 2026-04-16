import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchBar from "./index";

describe("SearchBar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function setup() {
    const setSearchTerm = vi.fn();
    render(<SearchBar setSearchTerm={setSearchTerm} />);
    const input = screen.getByRole("textbox", { name: "Search movies" });
    return { setSearchTerm, input };
  }

  it("renders the search input", () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  it("does not call setSearchTerm on initial render", () => {
    const { setSearchTerm } = setup();
    vi.runAllTimers();
    expect(setSearchTerm).not.toHaveBeenCalled();
  });

  it("calls setSearchTerm with the input value after 500ms debounce", () => {
    const { setSearchTerm, input } = setup();

    fireEvent.change(input, { target: { value: "batman" } });
    expect(setSearchTerm).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(setSearchTerm).toHaveBeenCalledWith("batman");
  });

  it("trims whitespace before calling setSearchTerm", () => {
    const { setSearchTerm, input } = setup();

    fireEvent.change(input, { target: { value: "  batman  " } });
    vi.advanceTimersByTime(500);

    expect(setSearchTerm).toHaveBeenCalledWith("batman");
  });

  it("only fires once when input changes multiple times within the debounce window", () => {
    const { setSearchTerm, input } = setup();

    fireEvent.change(input, { target: { value: "b" } });
    vi.advanceTimersByTime(100);
    fireEvent.change(input, { target: { value: "ba" } });
    vi.advanceTimersByTime(100);
    fireEvent.change(input, { target: { value: "bat" } });
    vi.advanceTimersByTime(500);

    expect(setSearchTerm).toHaveBeenCalledTimes(1);
    expect(setSearchTerm).toHaveBeenCalledWith("bat");
  });

  it("calls setSearchTerm with empty string when input is cleared", () => {
    const { setSearchTerm, input } = setup();

    fireEvent.change(input, { target: { value: "batman" } });
    vi.advanceTimersByTime(500);

    fireEvent.change(input, { target: { value: "" } });
    vi.advanceTimersByTime(500);

    expect(setSearchTerm).toHaveBeenLastCalledWith("");
  });
});
