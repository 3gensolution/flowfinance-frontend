"use client";

import {
  Box,
  Typography,
} from "@mui/material";

export interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  iconColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  unit,
  icon,
  trend,
  iconColor = "#2b8cee",
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#1e2732",
        border: "1px solid #283039",
        borderRadius: "0.75rem",
        p: 3,
        position: "relative",
        overflow: "hidden",
        group: {},
        "&:hover": {
          "& .icon-bg": {
            opacity: 0.2,
          },
        },
      }}
    >
      {/* Icon Background */}
      {icon && (
        <Box
          className="icon-bg"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 2,
            opacity: 0.1,
            transition: "opacity 0.2s ease",
            color: iconColor,
            fontSize: "3rem",
          }}
        >
          {icon}
        </Box>
      )}

      {/* Content */}
      <Typography
        sx={{
          color: "#a0adb8",
          fontSize: "0.875rem",
          fontWeight: 500,
          mb: 0.5,
        }}
      >
        {label}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {value}
        </Typography>
        {unit && (
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#64748b",
            }}
          >
            {unit}
          </Typography>
        )}
      </Box>

      {/* Trend */}
      {trend && (
        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: "0.75rem",
            color: trend.direction === "up" ? "#22c55e" : "#ef4444",
          }}
        >
          <span>{trend.direction === "up" ? "↑" : "↓"}</span>
          <span>{trend.value}</span>
        </Box>
      )}
    </Box>
  );
};
