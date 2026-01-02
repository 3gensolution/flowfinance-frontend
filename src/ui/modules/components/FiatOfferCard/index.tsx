"use client";

import {
  Card,
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export interface FiatOfferCardProps {
  id: string;
  loanAmount: number;
  currency: string;
  currencySymbol: string;
  apr: number;
  duration: string;
  collateralRequired: number;
  collateralToken: string;
  ltv: number;
  supplierName: string;
  supplierAvatar?: string;
  isVerified: boolean;
  trustScore: number;
  badge?: {
    label: string;
    icon: string;
    color: "green" | "purple";
  };
  onAcceptClick: () => void;
}

export const FiatOfferCard = ({
  id: _id,
  loanAmount,
  currency,
  currencySymbol,
  apr,
  duration,
  collateralRequired,
  collateralToken,
  ltv,
  supplierName,
  supplierAvatar,
  isVerified,
  trustScore,
  badge,
  onAcceptClick,
}: FiatOfferCardProps) => {
  const getCurrencyColor = () => {
    if (currency === "USD") return { bg: "#22c55e20", text: "#22c55e" };
    if (currency === "EUR") return { bg: "#3b82f620", text: "#3b82f6" };
    if (currency === "GBP") return { bg: "#06b6d420", text: "#06b6d4" };
    if (currency === "JPY") return { bg: "#f59e0b20", text: "#f59e0b" };
    return { bg: "#22c55e20", text: "#22c55e" };
  };

  const currencyColor = getCurrencyColor();

  return (
    <Card
      sx={{
        backgroundColor: "#1c2127",
        border: "1px solid #283039",
        borderRadius: "0.75rem",
        overflow: "hidden",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        p: 2.5,
        "&:hover": {
          borderColor: "rgba(43, 140, 238, 0.5)",
          boxShadow: "0 0 20px rgba(43, 140, 238, 0.1)",
        },
      }}
    >
      {/* Card Header with Loan Amount and Badge */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2.5,
          gap: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: "#9dabb9", fontSize: "0.65rem", fontWeight: 600, mb: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Loan Amount
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
            <Typography sx={{ color: "white", fontWeight: 700, fontSize: "1.75rem" }}>
              {currencySymbol}
              {loanAmount.toLocaleString()}
            </Typography>
            <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem", fontWeight: 500 }}>
              {currency}
            </Typography>
          </Box>
        </Box>
        {badge && (
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              backgroundColor: badge.color === "green" ? "#22c55e15" : "#a855f715",
              border: badge.color === "green" ? "1px solid #22c55e40" : "1px solid #a855f740",
              borderRadius: "0.375rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {badge.icon === "trending_down" && (
              <Typography sx={{ fontSize: "0.875rem" }}>📉</Typography>
            )}
            {badge.icon === "star" && (
              <Typography sx={{ fontSize: "0.875rem" }}>⭐</Typography>
            )}
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: badge.color === "green" ? "#22c55e" : "#a855f7",
              }}
            >
              {badge.label}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Metrics Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          mb: 2.5,
          p: 2,
          backgroundColor: "#161a20",
          borderRadius: "0.5rem",
          border: "1px solid rgba(40, 48, 57, 0.5)",
        }}
      >
        <Box>
          <Typography sx={{ color: "#9dabb9", fontSize: "0.7rem", fontWeight: 600, mb: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Interest (APR)
          </Typography>
          <Typography sx={{ color: "white", fontWeight: 700, fontSize: "1.25rem" }}>
            {apr}%
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#9dabb9", fontSize: "0.7rem", fontWeight: 600, mb: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Duration
          </Typography>
          <Typography sx={{ color: "white", fontWeight: 700, fontSize: "1.25rem" }}>
            {duration}
          </Typography>
        </Box>
        <Box sx={{ gridColumn: "1 / -1", pt: 1.5, borderTop: "1px solid rgba(40, 48, 57, 0.5)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75 }}>
            <Typography sx={{ color: "#9dabb9", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Collateral Required
            </Typography>
            <Typography sx={{ color: "#9dabb9", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              LTV: {ltv}%
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box sx={{ color: currencyColor.text, fontSize: "0.875rem" }}>◆</Box>
            <Typography sx={{ color: "white", fontWeight: 600, fontSize: "0.875rem" }}>
              {collateralRequired} {collateralToken}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Supplier Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5, pb: 2, borderBottom: "1px solid rgba(40, 48, 57, 0.5)" }}>
        {supplierAvatar && (
          <Avatar
            src={supplierAvatar}
            sx={{
              width: 32,
              height: 32,
              border: "1px solid #283039",
              flexShrink: 0,
            }}
          />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.25 }}>
            <Typography sx={{ color: "white", fontSize: "0.875rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              {supplierName}
            </Typography>
            {isVerified && (
              <VerifiedIcon
                sx={{
                  fontSize: "0.875rem",
                  color: "#2b8cee",
                  flexShrink: 0,
                }}
              />
            )}
          </Box>
          <Typography sx={{ color: "#9dabb9", fontSize: "0.75rem" }}>
            Trust Score: {trustScore}/100
          </Typography>
        </Box>
      </Box>

      {/* Action Button */}
      <Button
        onClick={onAcceptClick}
        sx={{
          backgroundColor: "#2b8cee",
          color: "white",
          fontWeight: 700,
          fontSize: "0.875rem",
          textTransform: "none",
          p: 1.25,
          boxShadow: "0 4px 12px rgba(43, 140, 238, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#4fa3f7",
            boxShadow: "0 4px 20px rgba(43, 140, 238, 0.4)",
            transform: "translateY(-2px)",
          },
        }}
      >
        Accept Offer
        <ArrowForwardIcon sx={{ fontSize: "1rem" }} />
      </Button>
    </Card>
  );
};
