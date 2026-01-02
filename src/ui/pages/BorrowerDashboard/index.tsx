"use client";

import {
  Box,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import {
  BorrowerDashboardSidebar,
} from "../../modules/components/BorrowerDashboardSidebar";
import {
  BorrowerDashboardHeader,
} from "../../modules/components/BorrowerDashboardHeader";
import {
  StatsCard,
} from "../../modules/components/StatsCard";
import {
  ActiveLoansTable,
  LoanRecord,
} from "../../modules/components/ActiveLoansTable";
import {
  PendingRequestsTable,
  PendingRequest,
} from "../../modules/components/PendingRequestsTable";
import {
  AccountBalanceWallet,
  TrendingDown,
  Lock,
} from "@mui/icons-material";

// Mock loan data
const mockLoans: LoanRecord[] = [
  {
    id: "#402",
    collateral: "ETH",
    collateralIcon: undefined,
    borrowed: "5,000 USDC",
    apy: "4.5%",
    healthFactor: 1.85,
    healthFactorLabel: "Safe",
    onRepayClick: () => console.log("Repay loan #402"),
    onAddCollateralClick: () => console.log("Add collateral to #402"),
  },
  {
    id: "#398",
    collateral: "WBTC",
    collateralIcon: undefined,
    borrowed: "7,450 USDC",
    apy: "3.8%",
    healthFactor: 1.15,
    healthFactorLabel: "Risk",
    onRepayClick: () => console.log("Repay loan #398"),
    onAddCollateralClick: () => console.log("Add collateral to #398"),
  },
];

// Mock pending requests data
const mockPendingRequests: PendingRequest[] = [
  {
    id: "#405",
    assetRequested: "10,000 DAI",
    collateralOffered: "6.2 ETH",
    status: "Matching",
    onCancelClick: () => console.log("Cancel request #405"),
  },
];

export const BorrowerDashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%", bg: "#101922" }}>
      {/* Sidebar */}
      <BorrowerDashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#101922",
        }}
      >
        {/* Header */}
        <BorrowerDashboardHeader />

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: { xs: 2, lg: 5 },
            backgroundColor: "#101922",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#101922",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#283039",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#3e4856",
            },
          }}
        >
          <Box sx={{ maxWidth: "1280px", mx: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Page Heading */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2,
              }}
            >
              <Stack gap={0.5}>
                <Typography
                  sx={{
                    fontSize: { xs: "1.875rem", md: "2.25rem" },
                    fontWeight: "900",
                    color: "white",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Borrower Dashboard
                </Typography>
                <Typography sx={{ color: "#a0adb8", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  Monitor your active loans, health factors, and pending requests.
                </Typography>
              </Stack>

              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "#2b8cee",
                  color: "white",
                  px: 3,
                  py: 1.5,
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(43, 140, 238, 0.2)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#1e7dd6",
                    boxShadow: "0 6px 16px rgba(43, 140, 238, 0.3)",
                  },
                }}
              >
                <span style={{ fontSize: "20px" }}>➕</span>
                <span>Borrow New Asset</span>
              </Button>
            </Box>

            {/* Stats Cards */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 2,
              }}
            >
              <StatsCard
                label="Total Borrowed"
                value="$12,450.00"
                unit="USDC"
                icon={<AccountBalanceWallet />}
                iconColor="#2b8cee"
              />
              <StatsCard
                label="Total Debt (w/ Interest)"
                value="$12,650.32"
                unit="USDC"
                icon={<TrendingDown />}
                iconColor="#ef4444"
              />
              <StatsCard
                label="Collateral Locked"
                value="8.50"
                unit="ETH"
                icon={<Lock />}
                iconColor="#22c55e"
                trend={{ value: "+2.4% value (24h)", direction: "up" }}
              />
            </Box>

            {/* Active Loans Table */}
            <ActiveLoansTable
              loans={mockLoans}
              onViewHistory={() => console.log("View loan history")}
            />

            {/* Pending Requests Table */}
            <PendingRequestsTable requests={mockPendingRequests} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
