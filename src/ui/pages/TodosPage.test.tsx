import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodosPage from "./TodosPage";

describe("ToDo List Page", () => {
  it("Renders and displays placeholder text", () => {
    render(<TodosPage />);
    expect(screen.getByText("TodosPage")).toBeInTheDocument();
  });
});
