import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import BorrowerNav from "../components/BorrowerNav";

test("renders Logout button on user details route", () => {
  render(
    <MemoryRouter initialEntries={["/dashboard/user-details"]}>
      <BorrowerNav />
    </MemoryRouter>
  );

  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});
