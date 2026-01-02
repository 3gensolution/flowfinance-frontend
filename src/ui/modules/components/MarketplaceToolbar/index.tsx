"use client";

import {
  Box,
  Card,
  Typography,
  Select,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

export type ViewMode = "grid" | "list";

export interface MarketplaceToolbarProps {
  totalLoans: number;
  sortBy: string;
  viewMode: ViewMode;
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const MarketplaceToolbar = ({
  totalLoans,
  sortBy,
  viewMode,
  onSortChange,
  onViewModeChange,
}: MarketplaceToolbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        backgroundColor: "#1c232d",
        border: "1px solid #283039",
        borderRadius: "0.75rem",
        p: 1.5,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        mb: 3,
      }}
    >
      {/* Left - Count Info */}
      <Typography
        sx={{
          color: "#9dabb9",
          fontSize: "0.875rem",
          pl: 1,
        }}
      >
        Showing{" "}
        <Typography component="span" sx={{ color: "white", fontWeight: 700 }}>
          {totalLoans}
        </Typography>{" "}
        opportunities
      </Typography>

      {/* Right - Sort and View Controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: isMobile ? "100%" : "auto",
        }}
      >
        {/* Sort Dropdown */}
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          size="small"
          sx={{
            backgroundColor: "#111418",
            color: "white",
            border: "1px solid #283039",
            borderRadius: "0.5rem",
            minWidth: "180px",
            fontSize: "0.875rem",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#283039",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2b8cee",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2b8cee",
            },
            "& .MuiSvgIcon-root": {
              color: "#9dabb9",
            },
          }}
        >
          <MenuItem value="newest">Newest Listed</MenuItem>
          <MenuItem value="highest-apy">Highest APY</MenuItem>
          <MenuItem value="lowest-risk">Lowest Risk</MenuItem>
          <MenuItem value="expiring-soon">Expiring Soon</MenuItem>
        </Select>

        {/* View Mode Toggle */}
        <Box
          sx={{
            backgroundColor: "#111418",
            borderRadius: "0.5rem",
            border: "1px solid #283039",
            p: 0.5,
            display: "flex",
            gap: 0.5,
          }}
        >
          <IconButton
            size="small"
            onClick={() => onViewModeChange("grid")}
            sx={{
              backgroundColor: viewMode === "grid" ? "#1c232d" : "transparent",
              color: viewMode === "grid" ? "#2b8cee" : "#9dabb9",
              "&:hover": {
                backgroundColor: "#1c232d",
              },
            }}
          >
            <GridViewIcon sx={{ fontSize: "1.25rem" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onViewModeChange("list")}
            sx={{
              backgroundColor: viewMode === "list" ? "#1c232d" : "transparent",
              color: viewMode === "list" ? "#2b8cee" : "#9dabb9",
              "&:hover": {
                backgroundColor: "#1c232d",
              },
            }}
          >
            <ViewListIcon sx={{ fontSize: "1.25rem" }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
