"use client";

import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useRecentFundedLoans } from "@/common/hooks/api/query/useLoanMarketplaceData";

export const LoanFeedSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: loans = [] } = useRecentFundedLoans(4);

  return (
    <Box component="section" sx={{ py: 10 }}>
      <Box
        sx={{
          padding: {
            sm: '0 24px',
            md: '0 48px',
            lg: '0 64px',
            xl: '0 96px',
          },
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Recent Funded Loans
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.875rem", color: "#10b981" }}>
            <Box
              sx={{
                position: "relative",
                width: 12,
                height: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#4ade80",
                  animation: "pulse 2s infinite",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }}
              />
            </Box>
            Live Updates
          </Box>
        </Box>

        {/* Table */}
        {!isMobile ? (
          <TableContainer
            component={Card}
            sx={{
              backgroundColor: "#1a2430",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 2,
            }}
            elevation={0}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  <TableCell sx={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Borrower
                  </TableCell>
                  <TableCell sx={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Collateral
                  </TableCell>
                  <TableCell sx={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Loan Amount
                  </TableCell>
                  <TableCell sx={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    APR
                  </TableCell>
                  <TableCell sx={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>
                    Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((loan, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "#2b8cee", fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {loan.borrower}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontSize: "0.875rem" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            backgroundColor: loan.collateralColor,
                          }}
                        />
                        {loan.collateral}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "white", fontSize: "0.875rem", fontWeight: 500 }}>
                      {loan.amount}
                    </TableCell>
                    <TableCell sx={{ color: "#4ade80", fontSize: "0.875rem" }}>
                      {loan.apr}
                    </TableCell>
                    <TableCell sx={{ color: "#64748b", fontSize: "0.875rem", textAlign: "right" }}>
                      {loan.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {loans.map((loan, idx) => (
              <Card
                key={idx}
                sx={{
                  backgroundColor: "#1a2430",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  p: 2,
                }}
                elevation={0}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" sx={{ color: "#2b8cee", fontFamily: "monospace" }}>
                    {loan.borrower}
                  </Typography>
                  <Typography sx={{ color: "#4ade80", fontSize: "0.875rem" }}>
                    {loan.apr}
                  </Typography>
                </Box>
                <Typography sx={{ color: "#cbd5e1", fontSize: "0.875rem", mb: 1 }}>
                  {loan.amount}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: loan.collateralColor,
                      }}
                    />
                    <Typography sx={{ fontSize: "0.75rem", color: "#cbd5e1" }}>
                      {loan.collateral}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#64748b", fontSize: "0.75rem" }}>
                    {loan.time}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Box>
    // </Box>
  );
};
