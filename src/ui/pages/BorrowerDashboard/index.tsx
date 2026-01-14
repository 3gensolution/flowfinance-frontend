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
import {
  useBorrowerLoans,
  useLenderOffersByUser,
  useLoanDetailsList,
  useLenderOfferDetailsList,
  useUserLoanRequests,
  useLoanRequestDetailsList
} from "@/common/hooks/api/query/useLoanMarketplaceData";
import { formatUnits } from "viem";
import { getTokenByAddress } from "@/common/constants";

export const BorrowerDashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const { address } = useAccount();

  // 1. Fetch IDs
  const { data: borrowerLoanIds = [], isLoading: borrowerLoansLoading } = useBorrowerLoans(address, !!address);
  const { data: userLoanRequestIds = [], isLoading: userRequestsLoading } = useUserLoanRequests(address, !!address);
  const { data: lenderOfferIds = [], isLoading: lenderOffersLoading } = useLenderOffersByUser(address, !!address);

  // 2. Fetch full details
  const { data: borrowerLoanDetails = [], isLoading: detailsLoading } = useLoanDetailsList(borrowerLoanIds as bigint[], !!borrowerLoanIds.length);
  const { data: userLoanRequestDetails = [], isLoading: reqDetailsLoading } = useLoanRequestDetailsList(userLoanRequestIds as bigint[], !!userLoanRequestIds.length);
  const { data: lenderOfferDetails = [], isLoading: offerDetailsLoading } = useLenderOfferDetailsList(lenderOfferIds as bigint[], !!lenderOfferIds.length);

  const isLoading = borrowerLoansLoading || userRequestsLoading || lenderOffersLoading || detailsLoading || reqDetailsLoading || offerDetailsLoading;

  // Transform borrower active loans
  const borrowerLoans: LoanRecord[] = (borrowerLoanDetails as any[]).map((loan) => {
    const borrowToken = getTokenByAddress(loan.borrowAsset);
    const collateralToken = getTokenByAddress(loan.collateralAsset);
    const principal = borrowToken ? formatUnits(loan.principalAmount, borrowToken.decimals) : "0";

    return {
      id: `#${loan.loanId.toString()}`,
      collateral: collateralToken?.symbol || "Unknown",
      collateralIcon: undefined,
      borrowed: `${Number(principal).toLocaleString()} ${borrowToken?.symbol || ""}`,
      apy: `${(Number(loan.interestRate) / 100).toFixed(1)}%`,
      healthFactor: 2.0, // Placeholder or fetch health factor hook if needed
      healthFactorLabel: "Safe",
      onRepayClick: () => toast.success(`Repaying loan #${loan.loanId.toString()}`),
      onAddCollateralClick: () => toast.success(`Adding collateral to #${loan.loanId.toString()}`),
    };
  });

  // Transform lender offers/requests
  const lenderOffers: PendingRequest[] = (lenderOfferDetails as any[]).map((offer) => {
    const lendToken = getTokenByAddress(offer.lendAsset);
    const collateralToken = getTokenByAddress(offer.requiredCollateralAsset);
    const amount = lendToken ? formatUnits(offer.lendAmount, lendToken.decimals) : "0";

    // contract status 0 = PENDING, 1 = ACTIVE/ACCEPTED, etc.
    // UI expects "Matching" | "Pending" | "Approved"
    let uiStatus: "Matching" | "Pending" | "Approved" = "Pending";
    if (offer.status === 0) uiStatus = "Matching";
    if (offer.status === 1) uiStatus = "Approved";

    return {
      id: `OFFER#${offer.offerId.toString()}`,
      assetRequested: `${Number(amount).toLocaleString()} ${lendToken?.symbol || ""}`,
      collateralOffered: collateralToken?.symbol || "Unknown",
      status: uiStatus,
      onCancelClick: () => toast.success(`Cancelling offer #${offer.offerId.toString()}`),
    };
  });

  // Also transform user loan requests (as borrower)
  const borrowerPendingRequests: PendingRequest[] = (userLoanRequestDetails as any[]).map((req) => {
    const borrowToken = getTokenByAddress(req.borrowAsset);
    const collateralToken = getTokenByAddress(req.collateralToken);
    const amount = borrowToken ? formatUnits(req.borrowAmount, borrowToken.decimals) : "0";

    let uiStatus: "Matching" | "Pending" | "Approved" = "Pending";
    if (req.status === 0) uiStatus = "Matching";

    return {
      id: `REQ#${req.requestId.toString()}`,
      assetRequested: `${Number(amount).toLocaleString()} ${borrowToken?.symbol || ""}`,
      collateralOffered: collateralToken?.symbol || "Unknown",
      status: uiStatus,
      onCancelClick: () => toast.success(`Cancelling request #${req.requestId.toString()}`),
    };
  });

  const hasBorrowerData = borrowerLoans.length > 0 || borrowerPendingRequests.length > 0;
  const hasLenderData = lenderOffers.length > 0;

  // Calculate borrower stats
  const totalBorrowed = (borrowerLoanDetails as any[]).reduce((sum, loan) => {
    const borrowToken = getTokenByAddress(loan.borrowAsset);
    const principal = borrowToken ? Number(formatUnits(loan.principalAmount, borrowToken.decimals)) : 0;
    return sum + principal;
  }, 0);

  const totalDebt = (borrowerLoanDetails as any[]).reduce((sum, loan) => {
    const borrowToken = getTokenByAddress(loan.borrowAsset);
    // Rough estimate: principal + current interest if known, or just principal for now
    const principal = borrowToken ? Number(formatUnits(loan.principalAmount, borrowToken.decimals)) : 0;
    const apy = Number(loan.interestRate) / 10000;
    const timeElapsed = (Date.now() / 1000) - Number(loan.startTime);
    const interest = principal * apy * (timeElapsed / (365 * 24 * 3600));
    return sum + principal + interest;
  }, 0);

  const totalCollateralLocked = (borrowerLoanDetails as any[]).reduce((sum, loan) => {
    const collatToken = getTokenByAddress(loan.collateralAsset);
    const amount = collatToken ? Number(formatUnits(loan.collateralAmount, collatToken.decimals)) : 0;
    return sum + amount;
  }, 0);

  // Calculate lender stats
  const totalOffered = (lenderOfferDetails as any[]).reduce((sum, offer) => {
    const lendToken = getTokenByAddress(offer.lendAsset);
    const amount = lendToken ? Number(formatUnits(offer.lendAmount, lendToken.decimals)) : 0;
    return sum + amount;
  }, 0);

  const avgInterest = lenderOfferDetails.length > 0
    ? (lenderOfferDetails as any[]).reduce((sum, offer) => sum + Number(offer.interestRate), 0) / lenderOfferDetails.length / 100
    : 0;

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
                        value={totalCollateralLocked.toFixed(2)}
                        unit="ETH"
                        icon={<Lock />}
                        iconColor="#22c55e"
                      />
                    </Box>

                    {/* Active Loans Table */}
                    <ActiveLoansTable
                      loans={borrowerLoans}
                      onViewHistory={() => console.log("View loan history")}
                    />

                    {/* Pending Requests Table */}
                    {borrowerPendingRequests.length > 0 && (
                      <Box sx={{ mt: 4 }}>
                        <PendingRequestsTable requests={borrowerPendingRequests} />
                      </Box>
                    )}
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
                        value={avgInterest.toFixed(1)}
                        unit="%"
                        icon={<Lock />}
                        iconColor="#f59e0b"
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
