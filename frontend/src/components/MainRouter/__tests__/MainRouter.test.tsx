import { render, screen } from "@testing-library/react";
import { MainRouter } from "../MainRouter";

describe("MainRouter", () => {
  it("should render Header", () => {
    render(<MainRouter />);

    expect(screen.getByRole("banner")).toBeVisible();
    expect(screen.getByRole("navigation")).toBeVisible();
  });
});
