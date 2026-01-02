"use client";

import {
  Card,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

export interface FiatOffersToolbarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const FiatOffersToolbar = ({
  sortBy,
  onSortChange,
}: FiatOffersToolbarProps) => {
  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 1.5,
        p: 0,
      }}
    >
      <Typography
        sx={{
          color: "#9dabb9",
          fontSize: "0.875rem",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        Sort by:
      </Typography>

      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        size="small"
        sx={{
          backgroundColor: "transparent",
          color: "white",
          fontSize: "0.875rem",
          fontWeight: 600,
          border: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiSvgIcon-root": {
            color: "#2b8cee",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <MenuItem value="lowest-apr">Lowest APR</MenuItem>
        <MenuItem value="highest-amount">Highest Amount</MenuItem>
        <MenuItem value="shortest-duration">Shortest Duration</MenuItem>
        <MenuItem value="newest">Newest Offers</MenuItem>
      </Select>
    </Card>
  );
};
