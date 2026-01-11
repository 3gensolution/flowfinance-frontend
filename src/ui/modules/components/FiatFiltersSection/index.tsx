"use client";

import {
  Box,
  Card,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import EventIcon from "@mui/icons-material/Event";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useSupportedAssets } from "@/common/hooks/api";
import { useAccount } from "wagmi";

export interface FiatFiltersState {
  fiatCurrency: string;
  loanAmountMin: number;
  loanAmountMax: number;
  maxApr: number;
  durations: string[];
  collaterals: string[];
}

export interface FiatFiltersProps {
  filters: FiatFiltersState;
  onFiltersChange: (filters: FiatFiltersState) => void;
  onResetFilters: () => void;
}

const durationOptions = [
  { label: "< 30 Days", value: "short" },
  { label: "1 - 6 Months", value: "medium" },
  { label: "6 - 12 Months", value: "long" },
  { label: "> 1 Year", value: "verylong" },
];

export const FiatFiltersSection = ({
  filters,
  onFiltersChange,
  onResetFilters,
}: FiatFiltersProps) => {
  const { isConnected } = useAccount();
  const { supportedSymbols } = useSupportedAssets(isConnected);

  const collateralOptions = ["All", ...supportedSymbols];
  const handleDurationChange = (duration: string) => {
    let updatedDurations = [...filters.durations];
    if (updatedDurations.includes(duration)) {
      updatedDurations = updatedDurations.filter((d) => d !== duration);
    } else {
      updatedDurations.push(duration);
    }
    onFiltersChange({ ...filters, durations: updatedDurations });
  };

  const handleCollateralChange = (collateral: string) => {
    let updatedCollaterals = [...filters.collaterals];
    if (updatedCollaterals.includes(collateral)) {
      updatedCollaterals = updatedCollaterals.filter((c) => c !== collateral);
    } else {
      updatedCollaterals.push(collateral);
    }
    onFiltersChange({ ...filters, collaterals: updatedCollaterals });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <FilterListIcon sx={{ color: "#2b8cee", fontSize: "1.5rem" }} />
        <Typography sx={{ color: "white", fontSize: "1.25rem", fontWeight: 700 }}>
          Filters
        </Typography>
      </Box>

      {/* Fiat Currency */}
      <Card
        sx={{
          backgroundColor: "#1c2127",
          border: "1px solid #283039",
          borderRadius: "0.75rem",
          p: 2.5,
        }}
      >
        <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem", fontWeight: 600, mb: 1.5 }}>
          Fiat Currency
        </Typography>
        <Select
          value={filters.fiatCurrency}
          onChange={(e) =>
            onFiltersChange({ ...filters, fiatCurrency: e.target.value })
          }
          size="small"
          fullWidth
          sx={{
            backgroundColor: "#161a20",
            color: "white",
            border: "1px solid #283039",
            borderRadius: "0.5rem",
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
          <MenuItem value="USD">USD (United States Dollar)</MenuItem>
          <MenuItem value="EUR">EUR (Euro)</MenuItem>
          <MenuItem value="GBP">GBP (British Pound)</MenuItem>
          <MenuItem value="JPY">JPY (Japanese Yen)</MenuItem>
        </Select>
      </Card>

      {/* Loan Amount Slider */}
      <Card
        sx={{
          backgroundColor: "#1c2127",
          border: "1px solid #283039",
          borderRadius: "0.75rem",
          p: 2.5,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem", fontWeight: 600 }}>
            Loan Amount ($)
          </Typography>
          <Typography sx={{ color: "#2b8cee", fontSize: "0.875rem", fontWeight: 700 }}>
            ${filters.loanAmountMin / 1000}k - ${filters.loanAmountMax / 1000 > 50 ? "50k+" : filters.loanAmountMax / 1000 + "k"}
          </Typography>
        </Box>
        <Slider
          value={[filters.loanAmountMin, filters.loanAmountMax]}
          onChange={(_, newValue) => {
            const [min, max] = newValue as [number, number];
            onFiltersChange({
              ...filters,
              loanAmountMin: min,
              loanAmountMax: max,
            });
          }}
          min={500}
          max={100000}
          step={1000}
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
          }}
        >
          <span>$500</span>
          <span>$100k+</span>
        </Box>
      </Card>

      {/* Max APR Slider */}
      <Card
        sx={{
          backgroundColor: "#1c2127",
          border: "1px solid #283039",
          borderRadius: "0.75rem",
          p: 2.5,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TrendingDownIcon sx={{ color: "#2b8cee", fontSize: "1.25rem" }} />
            <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem", fontWeight: 600 }}>
              Max APR (%)
            </Typography>
          </Box>
          <Typography sx={{ color: "#2b8cee", fontSize: "0.875rem", fontWeight: 700 }}>
            Up to {filters.maxApr}%
          </Typography>
        </Box>
        <Slider
          value={filters.maxApr}
          onChange={(_, newValue) =>
            onFiltersChange({ ...filters, maxApr: newValue as number })
          }
          min={1}
          max={20}
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
          }}
        >
          <span>1%</span>
          <span>20%</span>
        </Box>
      </Card>

      {/* Duration */}
      <Card
        sx={{
          backgroundColor: "#1c2127",
          border: "1px solid #283039",
          borderRadius: "0.75rem",
          p: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <EventIcon sx={{ color: "#2b8cee", fontSize: "1.25rem" }} />
          <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem", fontWeight: 600 }}>
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
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontSize: "0.875rem", color: "white" }}>
                  {option.label}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Card>

      {/* Collateral Type */}
      <Card
        sx={{
          backgroundColor: "#1c2127",
          border: "1px solid #283039",
          borderRadius: "0.75rem",
          p: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <CreditCardIcon sx={{ color: "#2b8cee", fontSize: "1.25rem" }} />
          <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem", fontWeight: 600 }}>
            Accepted Collateral
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {collateralOptions.map((option) => (
            <Button
              key={option}
              onClick={() => handleCollateralChange(option)}
              variant={
                filters.collaterals.includes(option) ? "contained" : "outlined"
              }
              size="small"
              sx={{
                borderRadius: "9999px",
                textTransform: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: filters.collaterals.includes(option)
                  ? "#2b8cee"
                  : "transparent",
                color: filters.collaterals.includes(option) ? "white" : "#9dabb9",
                border: filters.collaterals.includes(option)
                  ? "1px solid #2b8cee"
                  : "1px solid #283039",
                "&:hover": {
                  backgroundColor: filters.collaterals.includes(option)
                    ? "#4fa3f7"
                    : "rgba(43, 140, 238, 0.1)",
                  borderColor: "#2b8cee",
                },
              }}
            >
              {option}
            </Button>
          ))}
        </Box>
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
          py: 1.5,
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
