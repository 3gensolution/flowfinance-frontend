/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "@/ui/pages";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppStore, usePingApi } from "@/common/hooks";

// Mock the hooks used in the Home component
jest.mock("@/common/hooks", () => ({
  useAppStore: jest.fn(),
  usePingApi: jest.fn(),
}));

// Create a custom theme that includes the font property
const theme = createTheme({
  font: {
    title: "Arial, sans-serif",
  },
});

describe("Home Component", () => {
  beforeEach(() => {
    // Default state: user is not authenticated and API returns a successful result.
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
    });
    (usePingApi as unknown as jest.Mock).mockReturnValue({
      data: { success: true, data: "API Data" },
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch: jest.fn(),
    });
  });

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("renders the heading correctly", () => {
    renderWithTheme(<Home />);
    // The heading is rendered using MUI Typography with variant "h4"
    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Demo Page (To Get You Started)");
  });

  it("displays the ping API result", () => {
    renderWithTheme(<Home />);
    expect(screen.getByText(/Ping API Result:/)).toBeInTheDocument();
    expect(screen.getByText("API Data")).toBeInTheDocument();
  });

  it("shows login prompt when user is not authenticated", () => {
    renderWithTheme(<Home />);
    expect(screen.getByText("You are not logged in")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows welcome message and logout button when user is authenticated", () => {
    // Override the hook to simulate an authenticated state.
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", name: "John Doe", email: "john@example.com" },
      login: jest.fn(),
      logout: jest.fn(),
    });
    renderWithTheme(<Home />);
    expect(screen.getByText(/Welcome,/)).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
