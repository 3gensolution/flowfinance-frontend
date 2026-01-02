"use client";

import {
  Card,
  Box,
  Typography,
  Button,
  Chip,
  LinearProgress,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export interface LoanCardProps {
  id: string;
  borrowerAddress: string;
  isVerified?: boolean;
  timeAgo: string;
  riskLevel: "Low" | "Medium" | "High";
  borrowAmount: number;
  borrowToken: string;
  collateralAmount: number;
  collateralToken: string;
  apy: number;
  ltv: number;
  duration: string;
  expiresIn: string;
  fundedPercentage: number;
  collateralIcon?: string;
  riskColor?: string;
  onFundClick: () => void;
}

export const LoanCard = ({
  id,
  borrowerAddress,
  isVerified = false,
  timeAgo,
  riskLevel,
  borrowAmount,
  borrowToken,
  collateralAmount,
  collateralToken,
  apy,
  ltv,
  duration,
  expiresIn,
  fundedPercentage,
  onFundClick,
}: LoanCardProps) => {
  // id is used for React key in parent component
  void id;
  const getRiskColor = () => {
    switch (riskLevel) {
      case "Low":
        return "#10b981";
      case "Medium":
        return "#fbbf24";
      case "High":
        return "#ef4444";
      default:
        return "#2b8cee";
    }
  };

  const getRiskBgColor = () => {
    switch (riskLevel) {
      case "Low":
        return "rgba(16, 185, 129, 0.1)";
      case "Medium":
        return "rgba(251, 191, 36, 0.1)";
      case "High":
        return "rgba(239, 68, 68, 0.1)";
      default:
        return "rgba(43, 140, 238, 0.1)";
    }
  };

  const riskColor = getRiskColor();
  const riskBgColor = getRiskBgColor();

  return (
    <Card
      sx={{
        backgroundColor: "#1c232d",
        border: "1px solid #283039",
        borderRadius: "0.75rem",
        overflow: "hidden",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "rgba(43, 140, 238, 0.5)",
        },
      }}
    >
      <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Card Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: `${riskColor}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: riskColor,
              }}
            >
              <Typography sx={{ fontSize: "1.25rem" }}>◆</Typography>
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  {borrowerAddress}
                </Typography>
                {isVerified && (
                  <VerifiedIcon
                    sx={{ fontSize: "1rem", color: "#2b8cee", title: "Verified Borrower" }}
                  />
                )}
              </Box>
              <Typography sx={{ color: "#9dabb9", fontSize: "0.75rem" }}>
                {timeAgo}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={riskLevel + " Risk"}
            size="small"
            sx={{
              backgroundColor: riskBgColor,
              color: riskColor,
              border: `1px solid ${riskColor}33`,
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Metrics Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem 0.5rem",
            py: 1.5,
            borderTop: "1px solid rgba(40, 48, 57, 0.5)",
            borderBottom: "1px solid rgba(40, 48, 57, 0.5)",
          }}
        >
          <Box>
            <Typography sx={{ color: "#9dabb9", fontSize: "0.75rem", mb: 0.25 }}>
              Borrowing
            </Typography>
            <Typography sx={{ color: "white", fontWeight: 700, fontSize: "1.125rem" }}>
              {borrowAmount.toLocaleString()}
              <Typography component="span" sx={{ fontSize: "0.75rem", color: "#9dabb9", ml: 0.5 }}>
                {borrowToken}
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ color: "#9dabb9", fontSize: "0.75rem", mb: 0.25 }}>
              Collateral
            </Typography>
            <Typography sx={{ color: "white", fontWeight: 700, fontSize: "1.125rem" }}>
              {collateralAmount}
              <Typography component="span" sx={{ fontSize: "0.75rem", color: "#9dabb9", ml: 0.5 }}>
                {collateralToken}
              </Typography>
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "#9dabb9", fontSize: "0.75rem", mb: 0.25 }}>
              APY
            </Typography>
            <Typography sx={{ color: "#10b981", fontWeight: 700, fontSize: "1.125rem" }}>
              {apy}%
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ color: "#9dabb9", fontSize: "0.75rem", mb: 0.25 }}>
              LTV / Duration
            </Typography>
            <Typography sx={{ color: "white", fontWeight: 700, fontSize: "0.875rem", mt: 0.5 }}>
              {ltv}% <span style={{ color: "#9dabb9", margin: "0 0.5rem" }}>|</span> {duration}
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#9dabb9", fontSize: "0.75rem" }}>
            <AccessTimeIcon sx={{ fontSize: "0.875rem" }} />
            <span>Expires in {expiresIn}</span>
          </Box>
          <Button
            variant="contained"
            onClick={onFundClick}
            sx={{
              backgroundColor: "#2b8cee",
              color: "white",
              fontWeight: 700,
              fontSize: "0.875rem",
              textTransform: "none",
              px: 2,
              py: 1,
              "&:hover": {
                backgroundColor: "rgba(43, 140, 238, 0.9)",
              },
            }}
          >
            Fund Loan
          </Button>
        </Box>
      </Box>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={fundedPercentage}
        sx={{
          height: 4,
          backgroundColor: "#111418",
          "& .MuiLinearProgress-bar": {
            background: `linear-gradient(90deg, #10b981, #2b8cee)`,
          },
        }}
      />
    </Card>
  );
};
