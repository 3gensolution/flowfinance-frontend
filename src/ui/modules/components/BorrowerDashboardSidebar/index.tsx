"use client";

import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  Dashboard,
  Payments,
  Handshake,
  TrendingUp,
  Settings,
  Waves,
} from "@mui/icons-material";
import { ROUTES_SPEC } from "@/common/constants/routes";

export interface BorrowerDashboardSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export const BorrowerDashboardSidebar: React.FC<BorrowerDashboardSidebarProps> = ({
  activeSection = "Dashboard",
  onSectionChange,
}) => {
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", icon: Dashboard, href: ROUTES_SPEC.borrowerDashboard },
    { label: "Borrow", icon: Payments, href: ROUTES_SPEC.marketplace },
    { label: "Lend", icon: Handshake, href: ROUTES_SPEC.lenderOffer },
    { label: "Staking", icon: TrendingUp, href: "#" },
    { label: "Settings", icon: Settings, href: ROUTES_SPEC.settings },
  ];

  const handleClick = (section: string, href: string) => {
    onSectionChange?.(section);
    if (href !== "#") {
      router.push(href);
    }
  };

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        width: 256,
        flexDirection: "column",
        backgroundColor: "#1e2732",
        borderRight: "1px solid #283039",
        height: "100%",
        shrink: 0,
      }}
    >
      {/* Logo Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, py: 3 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981 0%, #2b8cee 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Waves sx={{ fontSize: 20 }} />
        </Box>
        <Typography
          sx={{
            color: "white",
            fontSize: "1.25rem",
            fontWeight: "bold",
            letterSpacing: "-0.02em",
          }}
        >
          FlowFinance
        </Typography>
      </Box>

      {/* Navigation Items */}
      <Stack sx={{ gap: 1, px: 2, mt: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.label;

          return (
            <Box
              key={item.label}
              onClick={() => handleClick(item.label, item.href)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.5,
                borderRadius: "0.5rem",
                backgroundColor: isActive ? "rgba(43, 140, 238, 0.1)" : "transparent",
                borderLeft: isActive ? "4px solid #2b8cee" : "none",
                color: isActive ? "#2b8cee" : "#a0adb8",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#283039",
                },
              }}
            >
              <Icon sx={{ fontSize: 20 }} />
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      {/* Support Section */}
      <Box sx={{ mt: "auto", p: 2, mb: 2 }}>
        <Box
          sx={{
            backgroundColor: "#283039",
            borderRadius: "0.75rem",
            p: 2,
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", color: "#a0adb8", mb: 1 }}>
            Need help?
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: "transparent",
              borderColor: "#4b5563",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 600,
              py: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Contact Support
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
