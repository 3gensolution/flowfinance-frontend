"use client";

import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ThunderboltIcon from "@mui/icons-material/Bolt";
import { ROUTES_SPEC } from "@/common/constants/routes";

import { useLoanMarketplaceStats } from "@/common/hooks/api/query/useLoanMarketplaceData";

export const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { data: statsData } = useLoanMarketplaceStats();

  const handleStartLending = () => {
    router.push(ROUTES_SPEC.lenderOffer);
  };

  const handleViewMarkets = () => {
    router.push(ROUTES_SPEC.marketplace);
  };

  const handleStartBorrowing = () => {
    router.push(ROUTES_SPEC.borrowerDashboard);
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        pt: 7,
        pb: 5,
        padding: {
          sm: '0 24px',
          md: '0 48px',
          lg: '0 64px',
          xl: '0 96px',
        },
        maxWidth: '1920px',
      }}
    >
      {/* Background gradients */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1000,
          height: 600,
          background: "radial-gradient(circle, rgba(43, 140, 238, 0.2) 0%, transparent 70%)",
          filter: "blur(120px)",
          zIndex: 0,
          mixBlendMode: "screen",
          opacity: 0.3,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 800,
          height: 600,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
          mixBlendMode: "screen",
          opacity: 0.2,
        }}
      />
      <Grid
        container
        spacing={6}
        alignItems="center"
        sx={{
          // mx: 'auto',
          width: "100%",

        }}
        justifyContent={'space-between'}
      >
        {/* Left Content */}
        <Grid size={{ xs: 12, lg: 4 }} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Badge */}
          <Chip
            icon={<Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#10b981", animation: "pulse 2s infinite" }} />}
            label="V2 Protocol is Live"
            sx={{
              width: "fit-content",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#cbd5e1",
              fontSize: "0.75rem",
            }}
          />

          {/* Heading */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem", lg: "4rem" },
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Peer-to-Peer{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #10b981 0%, #2b8cee 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DeFi Lending.
            </Box>
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.125rem",
              color: "#94a3b8",
              maxWidth: 500,
              lineHeight: 1.6,
            }}
          >
            Maximize your capital efficiency. Earn passive yields or borrow against your crypto assets
            instantly with zero paperwork.
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", pt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={handleStartLending}
              sx={{
                height: 48,
                paddingX: 4,
                fontSize: "1rem",
                fontWeight: 700,
                boxShadow: "0 8px 16px rgba(43, 140, 238, 0.25)",
              }}
            >
              Start Lending
            </Button>
            <Button
              variant="outlined"
              onClick={handleViewMarkets}
              sx={{
                height: 48,
                paddingX: 4,
                fontSize: "1rem",
                fontWeight: 700,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              View Markets
            </Button>
            <Button
              variant="outlined"
              onClick={handleStartBorrowing}
              sx={{
                height: 48,
                paddingX: 4,
                fontSize: "1rem",
                fontWeight: 700,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Start Borrowing
            </Button>
          </Box>

          {/* Trust badges */}
          <Box sx={{ display: "flex", gap: 6, pt: 2, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.875rem", color: "#64748b" }}>
              <VerifiedUserIcon sx={{ color: "#10b981", fontSize: "18px" }} />
              Audited by CertiK
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.875rem", color: "#64748b" }}>
              <ThunderboltIcon sx={{ color: "#2b8cee", fontSize: "18px" }} />
              Flash Loans Ready
            </Box>
          </Box>
        </Grid>

        {/* Right Content - Dashboard Card */}
        {!isMobile && (
          <Grid size={{ xs: 12, lg: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                width: {
                  xs: '100%',
                  lg: 500
                },
                aspectRatio: "1",
                background: "linear-gradient(135deg, #1a2430 0%, #101922 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                transform: "rotate(3deg)",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "rotate(0deg)",
                },
                position: "relative",
              }}
            >
              {/* Decorative shapes */}
              <Box
                sx={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2b8cee 0%, #a855f7 100%)",
                  filter: "blur(40px)",
                  opacity: 0.4,
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -20,
                  left: -20,
                  width: 128,
                  height: 128,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  filter: "blur(40px)",
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />

              {/* Content */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", pb: 2, borderBottom: "1px solid rgba(255, 255, 255, 0.05)", position: "relative", zIndex: 1 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                    Net APY
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#10b981",
                      mt: 0.5,
                    }}
                  >
                    12.4%
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                    Total Balance
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "white",
                      mt: 0.5,
                    }}
                  >
                    {statsData ? `$${(statsData.totalLoans * 12450.54).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$14,230.54"}
                  </Typography>
                </Box>
              </Box>

              {/* Assets List */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, position: "relative", zIndex: 1 }}>
                {[
                  { name: "Ethereum", symbol: "ETH", color: "#4f46e5", change: "+3.2%" },
                  { name: "USD Coin", symbol: "USDC", color: "#3b82f6", change: "+5.1%" },
                  { name: "Bitcoin", symbol: "BTC", color: "#f97316", change: "+1.8%" },
                ].map((asset) => (
                  <Box
                    key={asset.symbol}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 1,
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: asset.color + "33",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          color: asset.color,
                        }}
                      >
                        {asset.symbol}
                      </Box>
                      <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        {asset.name}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "0.875rem", fontFamily: "monospace", color: "#4ade80" }}>
                      {asset.change}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Box >
  );
};
