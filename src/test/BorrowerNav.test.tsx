import { render, screen, fireEvent } from "@testing-library/react";
import BorrowerNav from "../components/BorrowerNav";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock localStorage
beforeEach(() => {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem(
    "selectedUser",
    JSON.stringify({ id: "1", name: "Test User" })
  );
});

afterEach(() => {
  localStorage.clear();
});

const originalLocation = window.location;

beforeAll(() => {
  // ✅ Safely mock window.location.href
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...window.location, href: "" },
  });
});

afterAll(() => {
  // ✅ Restore original window.location
  Object.defineProperty(window, "location", {
    configurable: true,
    value: originalLocation,
  });
});

describe("BorrowerNav Component", () => {
  test("should render logout button", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/user-details"]}>
        <BorrowerNav />
      </MemoryRouter>
    );

    expect(screen.getByText(/logout/i)).to.exist;
  });

  test("should clear localStorage and redirect on logout", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/user-details"]}>
        <BorrowerNav />
      </MemoryRouter>
    );

    const logout = screen.getByText(/logout/i);
    fireEvent.click(logout);

    expect(localStorage.getItem("loggedIn")).toBeNull();
    expect(localStorage.getItem("selectedUser")).toBeNull();
    expect(window.location.href).toBe("/login");
  });
});
