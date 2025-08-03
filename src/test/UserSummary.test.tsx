import { render } from "@testing-library/react";
import UserSummary from "../components/UserSummary";
import { vi } from "vitest";

// ✅ Minimal valid mock to prevent crash
vi.mock("../services/api", () => ({
  fetchUsers: vi.fn().mockResolvedValue([]),
}));

describe("UserSummary", () => {
  it("renders without crashing", async () => {
    render(<UserSummary />);
  });
});
