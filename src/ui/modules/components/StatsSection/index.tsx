"use client";

import {
  Box,
  Typography,
  Card,
  Grid,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";

export const StatsSection = () => {
  const stats = [
    {
      label: "Total Value Locked",
      value: "$45.2M",
      icon: InfoIcon,
    },
    {
      label: "Active Loans",
      value: "1,204",
      icon: TrendingUpIcon,
    },
    {
      label: "Total Users",
      value: "8,500+",
      icon: GroupIcon,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#1a2430",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        py: 6,
      }}
    >
      <Box
        sx={{
          padding: {
            sm: '0 24px',
            md: '0 48px',
            lg: '0 64px',
            xl: '0 96px',
          },
          maxWidth: '1920px',
          mx: 'auto',
        }}
      >
        <Grid container spacing={4}>
          {stats.map((stat) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={stat.label}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  p: 3,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "rgba(43, 140, 238, 0.3)",
                    "& h3": {
                      color: "#2b8cee",
                    },
                  },
                }}
                elevation={0}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#94a3b8",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <stat.icon sx={{ fontSize: 16, color: "#64748b" }} />
                </Box>
                <Typography
                  component="h3"
                  sx={{
                    fontSize: "2.25rem",
                    fontWeight: 900,
                    color: "white",
                    transition: "color 0.3s ease",
                  }}
                >
                  {stat.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
