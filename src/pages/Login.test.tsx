import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";

// Mock window.location
const originalLocation = window.location;
beforeAll(() => {
  // @ts-ignore
  delete window.location;
  // @ts-ignore
  window.location = { href: "" };
});

afterAll(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    value: originalLocation,
  });
});

describe("Login Component", () => {
  const setup = () => {
    render(
      <HelmetProvider>
        <Login />
      </HelmetProvider>
    );
  };

  it("renders email and password inputs and login button", () => {
    setup();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("shows error when submitting empty form", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it("shows error on invalid email", () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it("shows error if password is less than 6 characters", () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  it("saves to localStorage and redirects on valid input", () => {
    setup();
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole("button", { name: /log in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(button);

    expect(localStorage.getItem("loggedIn")).toBe("true");
    expect(localStorage.getItem("userEmail")).toBe("test@example.com");
    expect(window.location.href).toBe("/dashboard");
  });
});
