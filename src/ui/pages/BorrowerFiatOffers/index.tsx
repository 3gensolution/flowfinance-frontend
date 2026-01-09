"use client";

import {
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useAccount } from "wagmi";
import {
  FiatFiltersSection,
  FiatFiltersState,
} from "../../modules/components/FiatFiltersSection";
import { FiatOffersToolbar } from "../../modules/components/FiatOffersToolbar";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LandingNavbar } from "@/ui/modules/components";
import { useActiveFiatLenderOffers } from "@/common/hooks/api";

export const BorrowerFiatOffersPage = () => {
  const { isConnected } = useAccount();
  const [sortBy, setSortBy] = useState("lowest-apr");
  const [filters, setFilters] = useState<FiatFiltersState>({
    fiatCurrency: "USD",
    loanAmountMin: 1000,
    loanAmountMax: 50000,
    maxApr: 8,
    durations: ["medium"],
    collaterals: ["All"],
  });

  const { data: offerIds, isLoading: isLoadingOffers } = useActiveFiatLenderOffers(isConnected);

  const handleResetFilters = () => {
    setFilters({
      fiatCurrency: "USD",
      loanAmountMin: 1000,
      loanAmountMax: 50000,
      maxApr: 8,
      durations: ["medium"],
      collaterals: ["All"],
    });
  };

  if (!isConnected) {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <LandingNavbar />
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Alert severity="warning">Please connect your wallet to view fiat offers</Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#111418",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <Box component="main" sx={{ flex: 1, pt: 8 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 0, minHeight: "100%" }}>
          {/* Sidebar Filters */}
          <Box
            sx={{
              width: "100%",
              lg: { width: 320 },
              backgroundColor: "rgba(22, 26, 32, 0.5)",
              borderBottom: { xs: "1px solid #283039", lg: "none" },
              borderRight: { xs: "none", lg: "1px solid #283039" },
              p: { xs: 2, lg: 3 },
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <FiatFiltersSection
              filters={filters}
              onFiltersChange={setFilters}
              onResetFilters={handleResetFilters}
            />
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, md: 3, lg: 4 },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Page Header with Toolbar */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "flex-end" },
                gap: 3,
              }}
            >
              <Box>
                <Typography
                  component="h1"
                  sx={{
                    color: "white",
                    fontSize: { xs: "1.875rem", md: "2.25rem" },
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Fiat Loan Offers
                </Typography>
                <Typography
                  sx={{
                    color: "#9dabb9",
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    maxWidth: "42rem",
                    lineHeight: 1.5,
                  }}
                >
                  Browse verified offers from liquidity suppliers tailored to your collateral. Secure
                  competitive rates instantly.
                </Typography>
              </Box>

              {/* Inline Toolbar */}
              <FiatOffersToolbar sortBy={sortBy} onSortChange={setSortBy} />
            </Box>

            {/* Offers Grid */}
            <Grid container spacing={2}>
              {isLoadingOffers ? (
                <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (offerIds && offerIds.length > 0) ? (
                offerIds.slice(0, 10).map((offerId) => (
                  <Grid key={offerId} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
                    {/* <FiatOfferCardWrapper offerId={offerId} /> */}
                  </Grid>
                ))
              ) : (
                <Alert severity="info" sx={{ width: "100%" }}>
                  No fiat loan offers available at the moment.
                </Alert>
              )}
            </Grid>

            {/* Load More Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 3 }}>
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 3,
                  py: 1.25,
                  borderRadius: "0.5rem",
                  backgroundColor: "transparent",
                  border: "1px solid #283039",
                  color: "white",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#1c2127",
                    borderColor: "#9dabb9",
                  },
                }}
              >
                <RefreshIcon
                  sx={{
                    fontSize: "1.25rem",
                    color: "#2b8cee",
                    transition: "transform 0.5s ease",
                  }}
                />
                Load More Offers
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
