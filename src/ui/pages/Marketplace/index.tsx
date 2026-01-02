"use client";

import {
  Box,
  Grid,
  Typography,
  Card,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { LoanCard, LoanCardProps } from "../../modules/components/LoanCard";
import {
  FiltersSection,
  FiltersState,
} from "../../modules/components/FiltersSection";
import {
  MarketplaceToolbar,
  ViewMode,
} from "../../modules/components/MarketplaceToolbar";
import { LandingNavbar } from "@/ui/modules/components";

// Mock loan data
const mockLoans: LoanCardProps[] = [
  {
    id: "1",
    borrowerAddress: "0x4a...8e21",
    isVerified: true,
    timeAgo: "2h ago",
    riskLevel: "Low",
    borrowAmount: 5000,
    borrowToken: "USDC",
    collateralAmount: 3.2,
    collateralToken: "ETH",
    apy: 8.5,
    ltv: 65,
    duration: "30d",
    expiresIn: "4h",
    fundedPercentage: 66,
    onFundClick: () => console.log("Fund loan 1"),
  },
  {
    id: "2",
    borrowerAddress: "0x9b...1f09",
    isVerified: false,
    timeAgo: "4h ago",
    riskLevel: "Medium",
    borrowAmount: 25000,
    borrowToken: "USDC",
    collateralAmount: 0.85,
    collateralToken: "WBTC",
    apy: 12.2,
    ltv: 75,
    duration: "90d",
    expiresIn: "22h",
    fundedPercentage: 25,
    onFundClick: () => console.log("Fund loan 2"),
  },
  {
    id: "3",
    borrowerAddress: "0x2c...4a11",
    isVerified: false,
    timeAgo: "15m ago",
    riskLevel: "Low",
    borrowAmount: 1200,
    borrowToken: "DAI",
    collateralAmount: 0.8,
    collateralToken: "ETH",
    apy: 6.5,
    ltv: 45,
    duration: "14d",
    expiresIn: "1h",
    fundedPercentage: 100,
    onFundClick: () => console.log("Fund loan 3"),
  },
  {
    id: "4",
    borrowerAddress: "0x8f...22b1",
    isVerified: false,
    timeAgo: "1d ago",
    riskLevel: "High",
    borrowAmount: 50000,
    borrowToken: "USDC",
    collateralAmount: 20000,
    collateralToken: "UNI",
    apy: 24.5,
    ltv: 85,
    duration: "180d",
    expiresIn: "48h",
    fundedPercentage: 20,
    onFundClick: () => console.log("Fund loan 4"),
  },
  {
    id: "5",
    borrowerAddress: "0x1a...55c2",
    isVerified: false,
    timeAgo: "5h ago",
    riskLevel: "Medium",
    borrowAmount: 8500,
    borrowToken: "USDC",
    collateralAmount: 5.5,
    collateralToken: "ETH",
    apy: 9.1,
    ltv: 70,
    duration: "60d",
    expiresIn: "12h",
    fundedPercentage: 50,
    onFundClick: () => console.log("Fund loan 5"),
  },
  {
    id: "6",
    borrowerAddress: "0x33...bb99",
    isVerified: false,
    timeAgo: "Just now",
    riskLevel: "Low",
    borrowAmount: 100000,
    borrowToken: "USDT",
    collateralAmount: 120000,
    collateralToken: "USDC",
    apy: 4.2,
    ltv: 83,
    duration: "30d",
    expiresIn: "23h",
    fundedPercentage: 100,
    onFundClick: () => console.log("Fund loan 6"),
  },
];

export const MarketplacePage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FiltersState>({
    collaterals: ["All"],
    maxLTV: 65,
    interestRateMin: 5,
    interestRateMax: 20,
    durations: ["medium"],
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = mockLoans.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleResetFilters = () => {
    setFilters({
      collaterals: ["All"],
      maxLTV: 65,
      interestRateMin: 5,
      interestRateMax: 20,
      durations: ["medium"],
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#101922",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <Box component="main" sx={{ flex: 1, pt: 10, pb: 6 }}>
        <Box
          sx={{
            padding: {
              sm: '0 24px',
              md: '0 48px',
              lg: '0 64px',
              xl: '0 96px',
            },
            maxWidth: '1920px',
            mx: 'auto',
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 6 }}>
            <Typography
              component="h1"
              sx={{
                color: "white",
                fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
                fontWeight: 900,
                mb: 1,
                letterSpacing: "-0.033em",
              }}
            >
              Loan Marketplace
            </Typography>
            <Typography
              sx={{
                color: "#9dabb9",
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: 400,
                maxWidth: "42rem",
              }}
            >
              Discover and fund peer-to-peer crypto loans. Earn competitive yields
              backed by over-collateralized assets.
            </Typography>
          </Box>

          {/* Stats Section */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 6,
              overflowX: "auto",
              pb: 1,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                height: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#283039",
                borderRadius: "2px",
              },
            }}
          >
            {[
              { label: "Active Loans", value: "1,248" },
              { label: "TVL", value: "$42.5M" },
              { label: "Avg. APY", value: "12.4%" },
            ].map((stat) => (
              <Card
                key={stat.label}
                sx={{
                  backgroundColor: "#1c232d",
                  border: "1px solid #283039",
                  borderRadius: "0.75rem",
                  p: 2,
                  minWidth: "140px",
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    color: "#9dabb9",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    mb: 0.5,
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  sx={{
                    color: stat.label === "Avg. APY" ? "#10b981" : "white",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                  }}
                >
                  {stat.value}
                </Typography>
              </Card>
            ))}
          </Box>

          {/* Main Content Grid */}
          <Grid container spacing={3}>
            {/* Sidebar Filters */}
            <Grid size={{ xs: 12, lg: 3 }}>
              <Box sx={{ position: "sticky", top: 100 }}>
                <FiltersSection
                  filters={filters}
                  onFiltersChange={setFilters}
                  onResetFilters={handleResetFilters}
                />
              </Box>
            </Grid>

            {/* Main Loan Feed */}
            <Grid size={{ xs: 12, lg: 9 }}>
              {/* Toolbar */}
              <MarketplaceToolbar
                totalLoans={mockLoans.length}
                sortBy={sortBy}
                viewMode={viewMode}
                onSortChange={setSortBy}
                onViewModeChange={setViewMode}
              />

              {/* Loans Grid */}
              <Grid
                container
                spacing={2}
                sx={{ mb: 4 }}
              >
                {paginatedLoans.map((loan) => (
                  <Grid
                    key={loan.id}
                    size={{
                      xs: 12,
                      sm: viewMode === "grid" ? 6 : 12,
                      md: viewMode === "grid" ? 4 : 12,
                      lg: viewMode === "grid" ? 4 : 12,
                    }}
                  >
                    <LoanCard {...loan} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#9dabb9",
                      border: "1px solid #283039",
                      backgroundColor: "#1c232d",
                      "&:hover": {
                        backgroundColor: "#283039",
                        color: "white",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#2b8cee",
                        color: "white",
                        border: "1px solid #2b8cee",
                      },
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        </Box>
      </Box>
      // </Box>
    // </Box>
  );
};
