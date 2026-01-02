"use client";

import {
  Box,
  Card,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  TextField,
  Button,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PercentIcon from "@mui/icons-material/Percent";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export interface FiltersState {
  collaterals: string[];
  maxLTV: number;
  interestRateMin: number;
  interestRateMax: number;
  durations: string[];
}

export interface FiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  onResetFilters: () => void;
}

const collateralOptions = ["All", "BTC", "ETH", "USDC"];
const durationOptions = [
  { label: "< 30 Days", value: "short" },
  { label: "30 - 90 Days", value: "medium" },
  { label: "> 90 Days", value: "long" },
];

export const FiltersSection = ({
  filters,
  onFiltersChange,
  onResetFilters,
}: FiltersProps) => {
  const handleCollateralChange = (collateral: string) => {
    let updatedCollaterals = [...filters.collaterals];
    if (updatedCollaterals.includes(collateral)) {
      updatedCollaterals = updatedCollaterals.filter((c) => c !== collateral);
    } else {
      updatedCollaterals.push(collateral);
    }
    onFiltersChange({ ...filters, collaterals: updatedCollaterals });
  };

  const handleDurationChange = (duration: string) => {
    let updatedDurations = [...filters.durations];
    if (updatedDurations.includes(duration)) {
      updatedDurations = updatedDurations.filter((d) => d !== duration);
    } else {
      updatedDurations.push(duration);
    }
    onFiltersChange({ ...filters, durations: updatedDurations });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
      {/* Collateral Filter */}
      <Card
        sx={{
          backgroundColor: "#1c232d",
          border: "1px solid #283039",
          borderRadius: "0.75rem",
          p: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <AttachMoneyIcon sx={{ color: "#2b8cee", fontSize: "1.25rem" }} />
          <Typography sx={{ color: "white", fontWeight: 700 }}>
            Collateral
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {collateralOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={filters.collaterals.includes(option)}
                  onChange={() => handleCollateralChange(option)}
                  sx={{
                    color: "#283039",
                    "&.Mui-checked": {
                      color: "#2b8cee",
                    },
                  }}
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: "0.875rem", color: "#9dabb9" }}>
                  {option}
                </Typography>
              }
              sx={{ mr: 0 }}
            />
          ))}
        </Box>
      </Card>

      {/* LTV Slider */}
      <Card
        sx={{
          backgroundColor: "#1c232d",
          border: "1px solid #283039",
          borderRadius: "0.75rem",
          p: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PercentIcon sx={{ color: "#2b8cee", fontSize: "1.25rem" }} />
            <Typography sx={{ color: "white", fontWeight: 700 }}>
              Max LTV
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "#2b8cee",
              fontFamily: "monospace",
              fontSize: "0.875rem",
              fontWeight: 700,
            }}
          >
            {filters.maxLTV}%
          </Typography>
        </Box>
        <Slider
          value={filters.maxLTV}
          onChange={(_, newValue) =>
            onFiltersChange({ ...filters, maxLTV: newValue as number })
          }
          min={0}
          max={100}
          sx={{
            color: "#2b8cee",
            "& .MuiSlider-track": {
              backgroundColor: "#2b8cee",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#283039",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "#9dabb9",
            mt: 1,
            fontFamily: "monospace",
          }}
        >
          <span>0%</span>
          <span>100%</span>
        </Box>
      </Card>

      {/* Interest Rate */}
      <Card
        sx={{
          backgroundColor: "#1c232d",
          border: "1px solid #283039",
          borderRadius: "0.75rem",
          p: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <TrendingUpIcon sx={{ color: "#2b8cee", fontSize: "1.25rem" }} />
          <Typography sx={{ color: "white", fontWeight: 700 }}>
            Interest Rate (APY)
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            type="number"
            value={filters.interestRateMin}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                interestRateMin: parseFloat(e.target.value),
              })
            }
            inputProps={{ min: 0, max: 100 }}
            size="small"
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#111418",
                color: "white",
                "& fieldset": {
                  borderColor: "#283039",
                },
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "0.875rem",
              },
            }}
          />
          <Typography sx={{ color: "#9dabb9" }}>-</Typography>
          <TextField
            type="number"
            value={filters.interestRateMax}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                interestRateMax: parseFloat(e.target.value),
              })
            }
            inputProps={{ min: 0, max: 100 }}
            size="small"
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#111418",
                color: "white",
                "& fieldset": {
                  borderColor: "#283039",
                },
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "0.875rem",
              },
            }}
          />
        </Box>
      </Card>

      {/* Duration */}
      <Card
        sx={{
          backgroundColor: "#1c232d",
          border: "1px solid #283039",
          borderRadius: "0.75rem",
          p: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <EventIcon sx={{ color: "#2b8cee", fontSize: "1.25rem" }} />
          <Typography sx={{ color: "white", fontWeight: 700 }}>
            Duration
          </Typography>
        </Box>
        <FormGroup>
          {durationOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={filters.durations.includes(option.value)}
                  onChange={() => handleDurationChange(option.value)}
                  sx={{
                    color: "#283039",
                    "&.Mui-checked": {
                      color: "#2b8cee",
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.875rem", color: "#9dabb9" }}>
                  {option.label}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Card>

      {/* Reset Button */}
      <Button
        onClick={onResetFilters}
        variant="outlined"
        fullWidth
        sx={{
          borderColor: "#283039",
          color: "#9dabb9",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "rgba(43, 140, 238, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
          },
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};
