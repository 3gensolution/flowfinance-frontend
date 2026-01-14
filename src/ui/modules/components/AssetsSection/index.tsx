"use client";

import {
  Box,
  Typography,
  Card,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useSupportedAssets } from "@/common/hooks/api/query/useConfigurationData";

export const AssetsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { supportedSymbols, isLoading } = useSupportedAssets();

  const allAssets = [
    { symbol: "ETH", name: "Ethereum", color: "#4f46e5", apy: "3.2%" },
    { symbol: "USDC", name: "USD Coin", color: "#3b82f6", apy: "5.4%" },
    { symbol: "WBTC", name: "Bitcoin", color: "#f97316", apy: "1.1%" },
    { symbol: "DAI", name: "Dai Stablecoin", color: "#fbbf24", apy: "4.8%" },
    { symbol: "MATIC", name: "Polygon", color: "#a855f7", apy: "6.2%" },
    { symbol: "UNI", name: "Uniswap", color: "#ec4899", apy: "8.5%" },
  ];

  // Filter assets to only show supported ones
  const assets = isLoading
    ? allAssets
    : allAssets.filter(asset => supportedSymbols.includes(asset.symbol as any));

  return (
    <Box component="section" sx={{ py: 10 }}>
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
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "1.875rem" }, fontWeight: 700, mb: 1 }}>
            Supported Assets
          </Typography>
          <Typography sx={{ color: "#94a3b8" }}>
            Multi-chain collateral support with competitive LTV ratios.
          </Typography>
        </Box>

        {/* Carousel */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            overflowX: isMobile ? "auto" : "hidden",
            overflowY: "hidden",
            pb: 2,
            px: isMobile ? 2 : 0,
            justifyContent: isMobile ? "flex-start" : "center",
            flexWrap: "wrap",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollBehavior: "smooth",
          }}
        >
          {assets.map((asset) => (
            <Card
              key={asset.symbol}
              sx={{
                minWidth: 140,
                backgroundColor: "#1a2430",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "rgba(43, 140, 238, 0.5)",
                  transform: "translateY(-4px)",
                },
              }}
              elevation={0}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: asset.color + "33",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: asset.color,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                }}
              >
                {asset.symbol}
              </Box>

              {/* Symbol */}
              <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
                {asset.symbol}
              </Typography>

              {/* APY */}
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#4ade80",
                  fontFamily: "monospace",
                }}
              >
                {asset.apy} APY
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
