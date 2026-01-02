"use client";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import {
  Menu,
  ExpandMore,
} from "@mui/icons-material";

export interface BorrowerDashboardHeaderProps {
  address?: string;
  network?: string;
  onMenuClick?: () => void;
}

export const BorrowerDashboardHeader: React.FC<BorrowerDashboardHeaderProps> = ({
  address = "0x84...9A2",
  network = "Ethereum Mainnet",
  onMenuClick,
}) => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #283039",
        backgroundColor: "#101922",
        px: 3,
        py: 2,
        shrink: 0,
      }}
    >
      {/* Mobile Menu & Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, lg: { display: "none" } }}>
        <Button
          sx={{
            color: "white",
            minWidth: "auto",
            p: 0,
            display: { xs: "flex", lg: "none" },
          }}
          onClick={onMenuClick}
        >
          <Menu />
        </Button>
        <Typography sx={{ color: "white", fontSize: "1.125rem", fontWeight: "bold" }}>
          FlowFinance
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 3,
          flex: 1,
        }}
      >
        {/* Network Badge */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
            backgroundColor: "#283039",
            borderRadius: "9999px",
            px: 2,
            py: 1,
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.5 },
              },
            }}
          />
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#cbd5e1" }}>
            {network}
          </Typography>
        </Box>

        {/* Wallet Button */}
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "#283039",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "9999px",
            pl: 1,
            pr: 2,
            py: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#323b46",
            },
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(to right, #3b82f6, #a855f7)",
            }}
          />
          <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "white" }}>
            {address}
          </Typography>
          <ExpandMore sx={{ color: "#a0adb8", fontSize: 18 }} />
        </Button>
      </Box>
    </Box>
  );
};
