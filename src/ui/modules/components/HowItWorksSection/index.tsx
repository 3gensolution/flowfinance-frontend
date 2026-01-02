"use client";

import {
  Box,
  Typography,
  Card,
  Grid,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TuneIcon from "@mui/icons-material/Tune";
import PaymentsIcon from "@mui/icons-material/Payments";

export const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Deposit Collateral",
      description: "Deposit any supported crypto asset into the secure FlowFinance smart contract vault.",
      icon: AccountBalanceIcon,
    },
    {
      number: 2,
      title: "Choose Terms",
      description: "Select your desired loan-to-value ratio and repayment duration. Instant approval.",
      icon: TuneIcon,
    },
    {
      number: 3,
      title: "Receive Funds",
      description: "Get stablecoins (USDC, DAI) sent directly to your wallet instantly.",
      icon: PaymentsIcon,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 10,
        backgroundColor: "rgba(26, 36, 48, 0.5)",
        position: "relative",
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
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, fontWeight: 700, mb: 2 }}>
            How FlowFinance Works
          </Typography>
          <Typography sx={{ color: "#94a3b8", maxWidth: 600, mx: "auto" }}>
            Get liquidity without selling your assets in three simple steps.
          </Typography>
        </Box>

        {/* Connector Line */}
        <Box
          sx={{
            position: "absolute",
            top: 120,
            left: "16%",
            right: "16%",
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(43, 140, 238, 0.3), transparent)",
            display: { xs: "none", md: "block" },
            zIndex: 0,
          }}
        />

        {/* Steps */}
        <Grid container spacing={4} sx={{ position: "relative", zIndex: 1 }}>
          {steps.map((step) => (
            <Grid size={{ xs: 12, md: 4 }} key={step.number}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 2.5,
                }}
              >
                {/* Icon Box */}
                <Box sx={{ position: "relative" }}>
                  <Card
                    sx={{
                      width: 96,
                      height: 96,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#1a2430",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 2,
                      boxShadow: "0 20px 25px rgba(0, 0, 0, 0.3)",
                    }}
                    elevation={0}
                  >
                    <step.icon sx={{ fontSize: 40, color: "#60a5fa" }} />
                  </Card>

                  {/* Number Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: -12,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#2b8cee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      color: "white",
                      fontSize: "0.875rem",
                      border: "4px solid #101922",
                    }}
                  >
                    {step.number}
                  </Box>
                </Box>

                {/* Text */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "white",
                      mb: 1,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "#94a3b8",
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
