import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserAccountTable from "../components/UserAccountTable";
import * as api from "../services/api";
import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock fetchUsers to avoid real API call
vi.mock("../services/api");

const mockUsers = [
  {
    id: "1",
    name: "Test User",
    username: "testuser",
    email: "test@example.com",
    phone: "8123456789",
    dateJoined: "2024-01-01T12:00:00Z",
    status: "Active",
    organization: "TestOrg",
  },
  {
    id: "2",
    name: "Another User",
    username: "anotheruser",
    email: "another@example.com",
    phone: "9098765432",
    dateJoined: "2024-06-10T08:00:00Z",
    status: "Inactive",
    organization: "DevCo",
  },
];

describe("UserAccountTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loader initially", async () => {
    (api.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    render(
      <MemoryRouter>
        <UserAccountTable searchQuery="" currentPage={1} itemsPerPage={5} />
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument(); // Loader
    await waitFor(() =>
      expect(screen.getByText("testuser")).toBeInTheDocument()
    );
  });

  it("displays users after loading", async () => {
    (api.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    render(
      <MemoryRouter>
        <UserAccountTable searchQuery="" currentPage={1} itemsPerPage={5} />
      </MemoryRouter>
    );

    expect(await screen.findByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("anotheruser")).toBeInTheDocument();
  });

  it("filters users based on searchQuery", async () => {
    (api.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    render(
      <MemoryRouter>
        <UserAccountTable
          searchQuery="devco"
          currentPage={1}
          itemsPerPage={5}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("testuser")).not.toBeInTheDocument();
      expect(screen.getByText("anotheruser")).toBeInTheDocument();
    });
  });

  it("shows error if fetch fails", async () => {
    (api.fetchUsers as jest.Mock).mockRejectedValue(new Error("Network error"));

    render(
      <MemoryRouter>
        <UserAccountTable searchQuery="" currentPage={1} itemsPerPage={5} />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/failed to load users/i)
    ).toBeInTheDocument();
  });

  it("shows 'No users found' when filter returns no results", async () => {
    (api.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    render(
      <MemoryRouter>
        <UserAccountTable
          searchQuery="nonexistent"
          currentPage={1}
          itemsPerPage={5}
        />
      </MemoryRouter>
    );

    expect(await screen.findByText("No users found")).toBeInTheDocument();
  });
});
