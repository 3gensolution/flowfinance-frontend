"use client";

import {
  Box,
  Grid,
  Typography,
  Card,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useState, useMemo } from "react";
import { LoanCard } from "../../modules/components/LoanCard";
import {
  FiltersSection,
  FiltersState,
} from "../../modules/components/FiltersSection";
import {
  MarketplaceToolbar,
  ViewMode,
} from "../../modules/components/MarketplaceToolbar";
import { LandingNavbar } from "@/ui/modules/components";
import { useLoanMarketplaceCards } from "@/common/hooks/api/query/useLoanMarketplaceData";

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

  // Fetch loan marketplace cards from contract
  const { data: loansData = [], isLoading, error } = useLoanMarketplaceCards();
  console.log("loansData", loansData);

  // Helper function to convert duration string to days for comparison
  const getDurationDays = (durationStr: string): number => {
    const num = parseInt(durationStr);
    if (durationStr.includes("d")) return num;
    if (durationStr.includes("h")) return num / 24;
    if (durationStr.includes("m")) return num / 1440;
    return num;
  };

  // Helper function to categorize duration
  const getDurationCategory = (durationStr: string): string => {
    const days = getDurationDays(durationStr);
    if (days <= 14) return "short";
    if (days <= 60) return "medium";
    return "long";
  };

  // Filter loans based on current filters
  const filteredLoans = useMemo(() => {
    return loansData.filter((loan) => {
      // Filter by collateral
      if (!filters.collaterals.includes("All") && !filters.collaterals.includes(loan.collateralToken)) {
        return false;
      }

      // Filter by LTV
      if (loan.ltv > filters.maxLTV) {
        return false;
      }

      // Filter by interest rate (APY)
      if (loan.apy < filters.interestRateMin || loan.apy > filters.interestRateMax) {
        return false;
      }

      // Filter by duration
      const durationCategory = getDurationCategory(loan.duration);
      if (!filters.durations.includes(durationCategory)) {
        return false;
      }

      return true;
    });
  }, [filters, loansData]);

  // Calculate pagination with filtered data
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredLoans.slice(startIndex, startIndex + itemsPerPage);

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
              sm: "0 24px",
              md: "0 48px",
              lg: "0 64px",
              xl: "0 96px",
            },
            maxWidth: "1920px",
            mx: "auto",
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
              { label: "Active Loans", value: loansData.length.toString() },
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
                totalLoans={filteredLoans.length}
                sortBy={sortBy}
                viewMode={viewMode}
                onSortChange={setSortBy}
                onViewModeChange={setViewMode}
              />

              {/* Loading State */}
              {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress sx={{ color: "#2b8cee" }} />
                </Box>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <Box sx={{ mb: 4, p: 3, backgroundColor: "#1c232d", borderRadius: "0.75rem" }}>
                  <Typography sx={{ color: "#ff6b6b" }}>
                    Error loading loan requests. Please try again later.
                  </Typography>
                </Box>
              )}

              {/* Loans Grid */}
              {!isLoading && !error && (
                <>
                  {filteredLoans.length === 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 12,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#9dabb9",
                          fontSize: "1.125rem",
                          fontWeight: 500,
                          mb: 1,
                        }}
                      >
                        No active loan offers currently
                      </Typography>
                      <Typography
                        sx={{
                          color: "#6b7684",
                          fontSize: "0.875rem",
                          fontWeight: 400,
                        }}
                      >
                        Try adjusting your filters or check back later
                      </Typography>
                    </Box>
                  ) : (
                    <>
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
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
