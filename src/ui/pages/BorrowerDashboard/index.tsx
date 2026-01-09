"use client";

import {
  Box,
  Typography,
  Stack,
  CircularProgress,
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
  TrendingUp,
} from "@mui/icons-material";
import { AppButton } from "@/ui/modules/components";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useBorrowerLoans, useLenderOffersByUser } from "@/common/hooks/api/query/useLoanMarketplaceData";

export const BorrowerDashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const { address } = useAccount();

  // Fetch borrower data
  const {
    data: borrowerLoanIds = [],
    isLoading: borrowerLoansLoading,
  } = useBorrowerLoans(address as `0x${string}` | undefined, !!address);

  // Fetch lender data
  const {
    data: lenderOfferIds = [],
    isLoading: lenderOffersLoading,
  } = useLenderOffersByUser(address as `0x${string}` | undefined, !!address);

  // Transform borrower loan IDs to LoanRecord format
  // Note: In production, you would fetch full loan details from contract
  const borrowerLoanIdsArray = Array.isArray(borrowerLoanIds) ? borrowerLoanIds : [];
  const borrowerLoans: LoanRecord[] = borrowerLoanIdsArray.map((id: any, index: number) => ({
    id: `#${typeof id === 'bigint' ? id.toString() : id}`,
    collateral: index % 2 === 0 ? "ETH" : "WBTC",
    collateralIcon: undefined,
    borrowed: `${5000 + index * 1000} USDC`,
    apy: `${(4.5 + index * 0.5).toFixed(1)}%`,
    healthFactor: 1.85 - index * 0.2,
    healthFactorLabel: (1.85 - index * 0.2) > 1.25 ? "Safe" : "Risk" as "Safe" | "Risk",
    onRepayClick: () => toast.success(`Repay loan #${typeof id === 'bigint' ? id.toString() : id}`),
    onAddCollateralClick: () => toast.success(`Add collateral to #${typeof id === 'bigint' ? id.toString() : id}`),
  }));

  // Transform lender offers to pending request format
  // Note: In production, you would fetch full offer details from contract
  const lenderOfferIdsArray = Array.isArray(lenderOfferIds) ? lenderOfferIds : [];
  const lenderOffers: PendingRequest[] = lenderOfferIdsArray.map((id: any, index: number) => ({
    id: `OFFER#${typeof id === 'bigint' ? id.toString() : id}`,
    assetRequested: `${10000 + index * 5000} USDC`,
    collateralOffered: `${5 + index * 1} ETH`,
    status: index % 3 === 0 ? "Matching" : index % 3 === 1 ? "Pending" : "Approved" as "Matching" | "Pending" | "Approved",
    onCancelClick: () => toast.success(`Cancelled offer #${typeof id === 'bigint' ? id.toString() : id}`),
  }));

  const hasBorrowerData = borrowerLoans.length > 0;
  const hasLenderData = lenderOffers.length > 0;
  const isLoading = borrowerLoansLoading || lenderOffersLoading;

  // Calculate stats
  const totalBorrowed = borrowerLoans.reduce((sum, loan) => {
    const amount = parseInt(loan.borrowed);
    return sum + amount;
  }, 0);

  const totalDebt = totalBorrowed * 1.016; // Approximate with ~1.6% interest
  const totalCollateral = borrowerLoans.length * 8.5; // Approximate

  const totalOffered = lenderOffers.reduce((sum, offer) => {
    const amount = parseInt(offer.assetRequested);
    return sum + amount;
  }, 0);

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
            p: { xs: 2, lg: "30px" },
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
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
              <CircularProgress sx={{ color: "#2b8cee" }} />
            </Box>
          ) : !hasBorrowerData && !hasLenderData ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "400px",
                textAlign: "center",
              }}
            >
              <Typography sx={{ color: "#9dabb9", fontSize: "1.125rem", mb: 1 }}>
                No activity yet
              </Typography>
              <Typography sx={{ color: "#6b7684", fontSize: "0.875rem" }}>
                Start borrowing or lending to see your dashboard
              </Typography>
            </Box>
          ) : (
            <Box sx={{ mx: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
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
                  <Typography sx={{ color: "#a0adb8", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                    Your personalized dashboard
                  </Typography>
                </Stack>

                <AppButton
                  variant="contained"
                  sx={{
                    backgroundColor: "#2b8cee",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(43, 140, 238, 0.2)",
                  }}
                  startIcon={<AccountBalanceWallet />}
                  onClick={() => toast.success("Borrow New Asset")}
                >
                  Borrow Asset
                </AppButton>
              </Box>

              {/* Borrower Section */}
              {hasBorrowerData && (
                <>
                  <Box>
                    <Typography sx={{ fontSize: "1.125rem", fontWeight: 600, color: "white", mb: 3 }}>
                      Borrower Activity
                    </Typography>

                    {/* Borrower Stats Cards */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                        gap: 2,
                        mb: 4,
                      }}
                    >
                      <StatsCard
                        label="Total Borrowed"
                        value={`$${totalBorrowed.toLocaleString()}.00`}
                        unit="USDC"
                        icon={<AccountBalanceWallet />}
                        iconColor="#2b8cee"
                      />
                      <StatsCard
                        label="Total Debt (w/ Interest)"
                        value={`$${Math.round(totalDebt).toLocaleString()}.00`}
                        unit="USDC"
                        icon={<TrendingDown />}
                        iconColor="#ef4444"
                      />
                      <StatsCard
                        label="Collateral Locked"
                        value={totalCollateral.toFixed(2)}
                        unit="ETH"
                        icon={<Lock />}
                        iconColor="#22c55e"
                        trend={{ value: "+2.4% value (24h)", direction: "up" }}
                      />
                    </Box>

                    {/* Active Loans Table */}
                    <ActiveLoansTable
                      loans={borrowerLoans}
                      onViewHistory={() => console.log("View loan history")}
                    />
                  </Box>
                </>
              )}

              {/* Lender Section */}
              {hasLenderData && (
                <>
                  <Box>
                    <Typography sx={{ fontSize: "1.125rem", fontWeight: 600, color: "white", mb: 3 }}>
                      Lender Activity
                    </Typography>

                    {/* Lender Stats Cards */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                        gap: 2,
                        mb: 4,
                      }}
                    >
                      <StatsCard
                        label="Total Offered"
                        value={`$${totalOffered.toLocaleString()}.00`}
                        unit="USDC"
                        icon={<AccountBalanceWallet />}
                        iconColor="#10b981"
                      />
                      <StatsCard
                        label="Active Offers"
                        value={lenderOffers.length.toString()}
                        unit="Offers"
                        icon={<TrendingUp />}
                        iconColor="#3b82f6"
                      />
                      <StatsCard
                        label="Avg. Interest"
                        value="8.5"
                        unit="%"
                        icon={<Lock />}
                        iconColor="#f59e0b"
                        trend={{ value: "+1.2% (24h)", direction: "up" }}
                      />
                    </Box>

                    {/* Lender Offers Table */}
                    <PendingRequestsTable requests={lenderOffers} />
                  </Box>
                </>
              )}

              {/* Both Roles Section */}
              {hasBorrowerData && hasLenderData && (
                <Box sx={{ pt: 2, borderTop: "1px solid #283039" }}>
                  <Typography sx={{ color: "#a0adb8", fontSize: "0.875rem", fontStyle: "italic" }}>
                    You are participating as both a borrower and lender. Manage your positions carefully to optimize returns.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
