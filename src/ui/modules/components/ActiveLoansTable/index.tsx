"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  LinearProgress,
} from "@mui/material";
import { DiamondOutlined } from "@mui/icons-material";

export interface LoanRecord {
  id: string;
  collateral: string;
  collateralIcon?: React.ReactNode;
  borrowed: string;
  apy: string;
  healthFactor: number;
  healthFactorLabel: "Safe" | "Risk";
  onRepayClick: () => void;
  onAddCollateralClick: () => void;
}

export interface ActiveLoansTableProps {
  loans: LoanRecord[];
  onViewHistory?: () => void;
}

export const ActiveLoansTable: React.FC<ActiveLoansTableProps> = ({
  loans,
  onViewHistory,
}) => {
  const getHealthFactorColor = (factor: number): string => {
    if (factor >= 1.5) return "#10b981"; // Green - Safe
    if (factor >= 1.0) return "#fbbf24"; // Yellow - Risk
    return "#ef4444"; // Red - Danger
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Active Loans
        </Typography>
        <Button
          onClick={onViewHistory}
          sx={{
            fontSize: "0.875rem",
            color: "#2b8cee",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              color: "#1e7dd6",
            },
          }}
        >
          View History
        </Button>
      </Box>

      {/* Table */}
      <Box
        sx={{
          overflow: "x-auto",
          borderRadius: "0.75rem",
          border: "1px solid #283039",
          backgroundColor: "#1e2732",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(40, 48, 57, 0.5)", borderBottom: "1px solid #283039" }}>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Loan ID
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Collateral
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Borrowed
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                APY
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Health Factor
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  textAlign: "right",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow
                key={loan.id}
                sx={{
                  borderBottom: "1px solid #283039",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                  },
                }}
              >
                <TableCell sx={{ p: 2, fontSize: "0.875rem", fontWeight: 500, color: "white" }}>
                  {loan.id}
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "#1c3a4d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {loan.collateralIcon || <DiamondOutlined sx={{ fontSize: 16, color: "white" }} />}
                    </Box>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: "white" }}>
                      {loan.collateral}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ p: 2, fontSize: "0.875rem", color: "#cbd5e1" }}>
                  {loan.borrowed}
                </TableCell>
                <TableCell sx={{ p: 2, fontSize: "0.875rem", color: "#cbd5e1" }}>
                  {loan.apy}
                </TableCell>
                <TableCell sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, width: 120 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          color: getHealthFactorColor(loan.healthFactor),
                        }}
                      >
                        {loan.healthFactor}
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                        {loan.healthFactorLabel}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(loan.healthFactor * 50, 100)}
                      sx={{
                        height: 6,
                        borderRadius: "9999px",
                        backgroundColor: "#374151",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: "9999px",
                          background: `linear-gradient(90deg, ${getHealthFactorColor(loan.healthFactor)} 0%, #10b981 100%)`,
                        },
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ p: 2, textAlign: "right" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={loan.onRepayClick}
                      sx={{
                        px: 1.5,
                        py: 0.75,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backgroundColor: "#2b8cee",
                        color: "white",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#1e7dd6",
                        },
                      }}
                    >
                      Repay
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={loan.onAddCollateralClick}
                      sx={{
                        px: 1.5,
                        py: 0.75,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: loan.healthFactor < 1.5 ? "white" : "#a0adb8",
                        backgroundColor: loan.healthFactor < 1.5 ? "#22c55e" : "transparent",
                        borderColor: loan.healthFactor < 1.5 ? "#22c55e" : "rgba(255, 255, 255, 0.1)",
                        animation: loan.healthFactor < 1.5 ? "pulse 2s infinite" : "none",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: loan.healthFactor < 1.5 ? "#16a34a" : "rgba(255, 255, 255, 0.1)",
                          borderColor: loan.healthFactor < 1.5 ? "#16a34a" : "rgba(255, 255, 255, 0.2)",
                        },
                        "@keyframes pulse": {
                          "0%, 100%": { opacity: 1 },
                          "50%": { opacity: 0.7 },
                        },
                      }}
                    >
                      Add Collateral
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
