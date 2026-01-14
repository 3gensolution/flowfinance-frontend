"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Card,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  Alert,
  CircularProgress as MuiCircularProgress,
  NativeSelect,
} from "@mui/material";
import {
  ArrowBack,
  AccountBalanceWallet,
  Tune,
  Shield,
  Info,
  LocalGasStation,
} from "@mui/icons-material";
import { LandingNavbar } from "@/ui/modules/components";
import { tokensAbi } from "@/common/abi/tokensAbi";
import { useRouter } from "next/navigation";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { useConfigurationParams, useCreateLenderOffer, useSupportedAssets } from "@/common/hooks/api";
import { TOKEN_ASSETS, TokenSymbol } from "@/common/constants";
import { validateInterestRate, validateLoanDuration, validatePositiveAmount } from "@/common/utils/validation";

// 🔹 Single source of truth
const TOKEN_SYMBOLS: TokenSymbol[] = [
  "USDC",
  "DAI",
  "WETH",
  "WBTC",
  "USDT",
];

export const LenderOfferPage: React.FC = () => {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { data: configParams, isLoading: isLoadingConfig } = useConfigurationParams(isConnected);
  const { supportedStatus = {}, isLoading: isLoadingSupport } = useSupportedAssets(isConnected);
  const { mutate: createOffer, isPending: isCreating } = useCreateLenderOffer();

  const [lendTokenSymbol, setLendTokenSymbol] = useState<TokenSymbol>("USDC");
  const [collateralTokenSymbol, setCollateralTokenSymbol] = useState<TokenSymbol>("WETH");
  const [amount, setAmount] = useState("1000");
  const [collateralAmount, setCollateralAmount] = useState("1");
  const [duration, setDuration] = useState("30");
  const [apy, setApy] = useState(12.5);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const lendToken = TOKEN_ASSETS[lendTokenSymbol];
  const collateralToken = TOKEN_ASSETS[collateralTokenSymbol];

  // Fetch Balances
  const { data: lendTokenBalance } = useReadContract({
    address: lendToken.address as `0x${string}`,
    abi: tokensAbi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!lendToken.address,
    },
  });

  // const { data: collateralTokenBalance } = useReadContract({
  //   address: collateralToken.address as `0x${string}`,
  //   abi: tokensAbi,
  //   functionName: "balanceOf",
  //   args: [address as `0x${string}`],
  //   query: {
  //     enabled: !!address && !!collateralToken.address,
  //   },
  // });

  const calculateProjectedEarnings = () => {
    const principal = parseFloat(amount) || 0;
    const daysMap: { [key: string]: number } = { "7": 7, "30": 30, "90": 90 };
    const days = daysMap[duration] || 30;
    return (principal * (apy / 100) * (days / 365)).toFixed(2);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const amountValidation = validatePositiveAmount(
      BigInt(parseInt(amount) || 0),
      "Lending Amount"
    );
    if (!amountValidation.valid) {
      newErrors["amount"] = amountValidation.error || "Invalid amount";
    } else {
      // Check Balance
      if (lendTokenBalance) {
        const inputAmountBigInt = BigInt(parseInt(amount)) * BigInt(10) ** BigInt(lendToken.decimals);
        if (inputAmountBigInt > lendTokenBalance) {
          newErrors["amount"] = "Amount exceeds balance";
        }
      }
    }

    const collateralValidation = validatePositiveAmount(
      BigInt(parseInt(collateralAmount) || 0),
      "Collateral Amount"
    );
    if (!collateralValidation.valid) {
      newErrors["collateralAmount"] = collateralValidation.error || "Invalid collateral amount";
    }

    if (configParams) {
      const rateValidation = validateInterestRate(
        BigInt(Math.floor(apy * 100)),
        configParams.maxInterestRate
      );
      if (!rateValidation.valid) {
        newErrors["apy"] = rateValidation.error || "Invalid rate";
      }

      // Convert duration from days to seconds for comparison with contract values
      const SECONDS_PER_DAY = BigInt(86400);
      const durationInSeconds = BigInt(parseInt(duration) || 0) * SECONDS_PER_DAY;
      const durationValidation = validateLoanDuration(
        durationInSeconds,
        configParams.minLoanDuration,
        configParams.maxLoanDuration
      );
      if (!durationValidation.valid) {
        newErrors["duration"] = durationValidation.error || "Invalid duration";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSetMaxLendAmount = () => {
    if (lendTokenBalance) {
      const maxAmount = formatUnits(lendTokenBalance, lendToken.decimals);
      setAmount(maxAmount.split('.')[0] || "0");
    }
  };

  const handlePublishOffer = async () => {
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    if (!isConnected) {
      setSubmitError("Please connect your wallet first");
      return;
    }

    // Validate token addresses are properly configured
    if (!lendToken.address || lendToken.address === "0x0") {
      setSubmitError(`Lending token address not configured. Please set NEXT_PUBLIC_${lendTokenSymbol}_ADDRESS environment variable.`);
      return;
    }

    if (!collateralToken.address || collateralToken.address === "0x0") {
      setSubmitError(`Collateral token address not configured. Please set NEXT_PUBLIC_${collateralTokenSymbol}_ADDRESS environment variable.`);
      return;
    }

    // Calculate amounts with proper decimals
    const lendAmount =
      BigInt(parseInt(amount)) * BigInt(10) ** BigInt(lendToken.decimals);
    const minCollateralAmount =
      BigInt(parseInt(collateralAmount)) * BigInt(10) ** BigInt(collateralToken.decimals);
    const interestRate = BigInt(Math.floor(apy * 100)); // Store as basis points (e.g., 1250 = 12.5%)
    const durationInSeconds = BigInt(parseInt(duration)) * BigInt(86400);

    createOffer(
      {
        lendAsset: lendToken.address as `0x${string}`,
        lendAmount,
        requiredCollateralAsset: collateralToken.address as `0x${string}`,
        minCollateralAmount,
        interestRate,
        duration: durationInSeconds,
      },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => {
            router.push("/lender-dashboard");
          }, 2000);
        },
        onError: (error) => {
          setSubmitError(`Failed to create offer: ${error instanceof Error ? error.message : "Unknown error"}`);
        },
      }
    );
  };

  const projectedEarnings = calculateProjectedEarnings();
  const totalReturn = (parseFloat(amount) + parseFloat(projectedEarnings)).toFixed(2);

  const maxInterestRateDisplay = configParams
    ? (Number(configParams.maxInterestRate) / 100).toFixed(2)
    : "Loading...";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#111418",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        pt: 12,
      }}
    >
      {/* Header */}
      <LandingNavbar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          py: { xs: 2, lg: 3 },
          px: { xs: 1, lg: 2 },
        }}
      >
        {!isConnected && (
          <Alert severity="warning" sx={{ position: "fixed", top: 100, left: 20, right: 20, zIndex: 100 }}>
            Please connect your wallet to create an offer
          </Alert>
        )}

        {submitError && (
          <Alert severity="error" sx={{ position: "fixed", top: 100, left: 20, right: 20, zIndex: 100 }}>
            {submitError}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ position: "fixed", top: 100, left: 20, right: 20, zIndex: 100 }}>
            Offer created successfully! Redirecting...
          </Alert>
        )}
        <Box
          sx={{
            maxWidth: '1920px',
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: {
              sm: '0 24px',
              md: '0 48px',
              lg: '0 64px',
              xl: '0 96px',
            },
          }}
        >
          {/* Page Heading */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              sx={{
                color: "#2b8cee",
                background: "none",
                padding: 0,
                width: 'fit-content',
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
              startIcon={<ArrowBack sx={{ fontSize: "1.125rem" }} />}
              onClick={() => router.back()}
            >
              Back to Dashboard
            </Button>
            <Typography sx={{ fontSize: { xs: "1.875rem", lg: "2.25rem" }, fontWeight: 900, letterSpacing: "-0.033em" }}>
              New Lending Offer
            </Typography>
            <Typography sx={{ color: "#9dabb9", fontSize: "1rem", fontWeight: 400 }}>
              Define your lending terms to create a marketplace offer for borrowers.
            </Typography>
          </Box>

          {/* Content Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" },
              gap: 4,
              alignItems: "start",
            }}
          >
            {/* Left Column: Form */}
            <Box sx={{ gridColumn: { xs: "1", lg: "span 8" }, display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Section 1: Loan Details */}
              <Card
                sx={{
                  background: "#1c2127",
                  border: "1px solid #283039",
                  borderRadius: "12px",
                  p: { xs: 1.5, lg: 2 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <AccountBalanceWallet sx={{ color: "#2b8cee", fontSize: "1.5rem" }} />
                  <Typography sx={{ color: "#fff", fontSize: "1.125rem", fontWeight: "bold" }}>
                    Loan Details
                  </Typography>
                </Box>

                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 2 }}>
                  {/* Lend Asset Select */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
                    <Typography sx={{ color: "#fff", fontSize: "1rem", fontWeight: 500 }}>
                      I want to lend
                    </Typography>
                    <FormControl fullWidth variant="standard" size="small">
                      <InputLabel id="lend-token-select-label" shrink>
                        I want to lend
                      </InputLabel>
                      <NativeSelect
                        id="lend-token-native-select"
                        value={lendTokenSymbol}
                        onChange={(e) => setLendTokenSymbol(e.target.value as TokenSymbol)}
                        sx={{
                          color: "#fff",
                          borderRadius: "8px",
                          height: 56,
                          backgroundColor: "#111418",
                          border: "1px solid #3b4754",
                          fontSize: "1rem",
                          fontWeight: 400,
                          px: 1,
                          "&:hover": { borderColor: "#3b4754" },
                          "&::before, &::after": { display: "none" },
                        }}
                        inputProps={{
                          name: 'lendToken',
                        }}
                      >
                        {TOKEN_SYMBOLS.map((symbol) => {
                          const asset = TOKEN_ASSETS[symbol];
                          const isSupported = supportedStatus[asset.address?.toLowerCase() || ""] ?? false;
                          return (
                            <option key={symbol} value={symbol} disabled={!isSupported} style={{ backgroundColor: "#111418", color: "#fff" }}>
                              {asset.symbol} ({asset.name}) {!isSupported && "(Not supported)"}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </Box>

                  {/* Amount Input */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ color: "#fff", fontSize: "1rem", fontWeight: 500 }}>
                        Amount
                      </Typography>
                      <Typography
                        onClick={handleSetMaxLendAmount}
                        sx={{
                          color: "#2b8cee",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          "&:hover": { textDecoration: "underline" }
                        }}
                      >
                        Balance: {lendTokenBalance ? Number(formatUnits(lendTokenBalance, lendToken.decimals)).toFixed(2) : "0.00"}
                      </Typography>
                    </Box>
                    <TextField
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      error={!!errors["amount"]}
                      helperText={errors["amount"]}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {lendToken.symbol}
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          height: 56,
                          borderRadius: "8px",
                          backgroundColor: "#111418",
                          border: "1px solid #3b4754",
                          fontSize: "1rem",
                          fontWeight: 400,
                          "& fieldset": { borderColor: "#3b4754" },
                          "&:hover fieldset": { borderColor: "#3b4754" },
                          "&.Mui-focused fieldset": { borderColor: "#2b8cee", borderWidth: 1 },
                        },
                        "& input::placeholder": { color: "#9dabb9" },
                        "& .MuiFormHelperText-root": { color: "#ef4444" },
                      }}
                    />
                  </Box>
                </Box>
              </Card>

              {/* Section 2: Terms & Rates */}
              <Card
                sx={{
                  background: "#1c2127",
                  border: "1px solid #283039",
                  borderRadius: "12px",
                  p: { xs: 1.5, lg: 2 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Tune sx={{ color: "#2b8cee", fontSize: "1.5rem" }} />
                  <Typography sx={{ color: "#fff", fontSize: "1.125rem", fontWeight: "bold" }}>
                    Terms & Rates
                  </Typography>
                </Box>

                {/* Duration */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Typography sx={{ color: "#fff", fontSize: "1rem", fontWeight: 500 }}>
                    Loan Duration
                  </Typography>
                  <RadioGroup
                    row
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                      gap: 1,
                    }}
                  >
                    {[
                      { value: "7", label: "7 Days" },
                      { value: "30", label: "30 Days" },
                      { value: "90", label: "90 Days" },
                      { value: "365", label: "1 Year" },
                    ].map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio sx={{ display: "none" }} />}
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: 48,
                              borderRadius: "8px",
                              border: "1px solid #3b4754",
                              backgroundColor: "#111418",
                              color: "#9dabb9",
                              transition: "all 0.2s",
                              cursor: "pointer",
                              width: "100%",
                              ...(duration === option.value && {
                                borderColor: "#2b8cee",
                                backgroundColor: "rgba(43,140,238,0.1)",
                                color: "#2b8cee",
                              }),
                              "&:hover": { borderColor: "rgba(43,140,238,0.5)" },
                            }}
                          >
                            {option.label}
                          </Box>
                        }
                        sx={{ m: 0, width: "100%" }}
                      />
                    ))}
                  </RadioGroup>
                  {errors["duration"] && (
                    <Typography sx={{ color: "#ef4444", fontSize: "0.75rem", mt: 1 }}>
                      {errors["duration"]}
                    </Typography>
                  )}
                </Box>

                {/* APY Slider */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <Typography sx={{ color: "#fff", fontSize: "1rem", fontWeight: 500 }}>
                      Annual Interest Rate (APY)
                    </Typography>
                    <TextField
                      type="number"
                      value={apy}
                      onChange={(e) => setApy(parseFloat(e.target.value))}
                      error={!!errors["apy"]}
                      InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                      sx={{
                        width: 128,
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          height: 40,
                          borderRadius: "8px",
                          backgroundColor: "#111418",
                          border: "1px solid #3b4754",
                          fontSize: "0.875rem",
                          textAlign: "right",
                          "& fieldset": { borderColor: "#3b4754" },
                          "&:hover fieldset": { borderColor: "#3b4754" },
                          "&.Mui-focused fieldset": { borderColor: "#2b8cee" },
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ px: 1 }}>
                    <Slider
                      value={apy}
                      onChange={(_, newValue) => setApy(newValue as number)}
                      min={0.5}
                      max={parseFloat(maxInterestRateDisplay) || 50}
                      step={0.5}
                      sx={{
                        color: "#2b8cee",
                        "& .MuiSlider-track": { backgroundColor: "#2b8cee", border: "none" },
                        "& .MuiSlider-rail": { backgroundColor: "#3b4754" },
                        "& .MuiSlider-thumb": {
                          backgroundColor: "#2b8cee",
                          boxShadow: "0 0 10px rgba(43,140,238,0.5)",
                          "&:hover, &.Mui-focusVisible": { boxShadow: "0 0 15px rgba(43,140,238,0.7)" },
                        },
                      }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, fontSize: "0.75rem", color: "#9dabb9", fontWeight: 500 }}>
                      <span>0.5%</span>
                      <span>{(parseFloat(maxInterestRateDisplay) / 2).toFixed(1)}%</span>
                      <span>{maxInterestRateDisplay}%</span>
                    </Box>
                  </Box>
                  {errors["apy"] && (
                    <Typography sx={{ color: "#ef4444", fontSize: "0.75rem", mt: 1 }}>
                      {errors["apy"]}
                    </Typography>
                  )}
                </Box>
              </Card>

              {/* Section 3: Collateral & Security */}
              <Card
                sx={{
                  background: "#1c2127",
                  border: "1px solid #283039",
                  borderRadius: "12px",
                  p: { xs: 1.5, lg: 2 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Shield sx={{ color: "#2b8cee", fontSize: "1.5rem" }} />
                  <Typography sx={{ color: "#fff", fontSize: "1.125rem", fontWeight: "bold" }}>
                    Collateral & Security
                  </Typography>
                </Box>

                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 2 }}>
                  {/* Collateral Asset Select */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
                    <Typography sx={{ color: "#fff", fontSize: "1rem", fontWeight: 500 }}>
                      Accepted Collateral
                    </Typography>
                    <FormControl fullWidth variant="standard" size="small">
                      <InputLabel id="collateral-token-select-label" shrink>
                        Accepted Collateral
                      </InputLabel>
                      <NativeSelect
                        id="collateral-token-native-select"
                        value={collateralTokenSymbol}
                        onChange={(e) => setCollateralTokenSymbol(e.target.value as TokenSymbol)}
                        sx={{
                          color: "#fff",
                          borderRadius: "8px",
                          height: 56,
                          backgroundColor: "#111418",
                          border: "1px solid #3b4754",
                          fontSize: "1rem",
                          fontWeight: 400,
                          px: 1,
                          "&:hover": { borderColor: "#3b4754" },
                          "&::before, &::after": { display: "none" },
                        }}
                        inputProps={{
                          name: 'collateralToken',
                        }}
                      >
                        {TOKEN_SYMBOLS.map((symbol) => {
                          const asset = TOKEN_ASSETS[symbol];
                          const isSupported = supportedStatus[asset.address?.toLowerCase() || ""] ?? false;
                          return (
                            <option key={symbol} value={symbol} disabled={!isSupported} style={{ backgroundColor: "#111418", color: "#fff" }}>
                              {asset.symbol} ({asset.name}) {!isSupported && "(Not supported)"}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </Box>

                  {/* Collateral Amount Input */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ color: "#fff", fontSize: "1rem", fontWeight: 500 }}>
                        Minimum Collateral
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 400, color: "#9dabb9", cursor: "help" }} title="The minimum amount of collateral required for this offer.">
                          (Amount)
                        </Typography>
                        <Info sx={{ fontSize: "1rem", color: "#9dabb9", cursor: "help" }} />
                      </Box>
                    </Box>
                    <TextField
                      type="number"
                      value={collateralAmount}
                      onChange={(e) => setCollateralAmount(e.target.value)}
                      placeholder="0"
                      error={!!errors["collateralAmount"]}
                      helperText={errors["collateralAmount"]}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">{collateralToken.symbol}</InputAdornment>,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          height: 56,
                          borderRadius: "8px",
                          backgroundColor: "#111418",
                          border: "1px solid #3b4754",
                          fontSize: "1rem",
                          fontWeight: 400,
                          "& fieldset": { borderColor: "#3b4754" },
                          "&:hover fieldset": { borderColor: "#3b4754" },
                          "&.Mui-focused fieldset": { borderColor: "#2b8cee", borderWidth: 1 },
                        },
                        "& input::placeholder": { color: "#9dabb9" },
                        "& .MuiFormHelperText-root": { color: "#ef4444" },
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            </Box>

            {/* Right Column: Summary Sticky */}
            <Box
              sx={{
                gridColumn: { xs: "1", lg: "span 4" },
                display: "flex",
                flexDirection: "column",
                gap: 2,
                position: { lg: "sticky" },
                top: { lg: 32 },
              }}
            >
              {/* Summary Card */}
              <Card
                sx={{
                  background: "#1c2127",
                  border: "1px solid #283039",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}
              >
                {/* Header */}
                <Box sx={{ p: 1.5, borderBottom: "1px solid #283039", background: "rgba(28,33,39,0.5)" }}>
                  <Typography sx={{ color: "#fff", fontSize: "1.125rem", fontWeight: "bold", mb: 0.5 }}>
                    Offer Summary
                  </Typography>
                  <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem" }}>
                    Review your terms before publishing.
                  </Typography>
                </Box>

                {/* Summary Items */}
                <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem" }}>Principal Amount</Typography>
                    <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                      {amount} {lendToken.symbol}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem" }}>Required Collateral</Typography>
                    <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                      {collateralAmount} {collateralToken.symbol}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem" }}>Duration</Typography>
                    <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                      {duration} Days
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem" }}>APY</Typography>
                    <Typography sx={{ color: "#10b981", fontWeight: 500 }}>{apy}%</Typography>
                  </Box>

                  <Divider sx={{ my: 1, backgroundColor: "#283039" }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ color: "#9dabb9", fontSize: "0.875rem" }}>Projected Earnings</Typography>
                    <Typography sx={{ color: "#10b981", fontWeight: "bold" }}>
                      +{projectedEarnings} {lendToken.symbol}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1,
                      p: 1,
                      background: "rgba(43,140,238,0.1)",
                      borderRadius: "8px",
                      border: "1px solid rgba(43,140,238,0.2)",
                    }}
                  >
                    <Typography sx={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600 }}>
                      Total Return
                    </Typography>
                    <Typography sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.125rem" }}>
                      {totalReturn} {lendToken.symbol}
                    </Typography>
                  </Box>
                </Box>

                {/* Buttons */}
                <Box sx={{ p: 1.5, pt: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    fullWidth
                    disabled={isCreating || isLoadingConfig || isLoadingSupport || !supportedStatus[lendToken.address.toLowerCase()] || !supportedStatus[collateralToken.address.toLowerCase()]}
                    onClick={handlePublishOffer}
                    sx={{
                      height: 48,
                      borderRadius: "8px",
                      background: "linear-gradient(to right, #10b981, #2b8cee)",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textTransform: "none",
                      boxShadow: "0 0 20px rgba(43,140,238,0.3)",
                      "&:hover": { opacity: 0.9 },
                      "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
                    }}
                  >
                    {isCreating ? <MuiCircularProgress size={24} sx={{ color: "#fff" }} /> : "Publish Offer"}
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => router.back()}
                    sx={{
                      height: 48,
                      borderRadius: "8px",
                      background: "transparent",
                      border: "1px solid #283039",
                      color: "#9dabb9",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      textTransform: "none",
                      transition: "all 0.2s",
                      "&:hover": {
                        color: "#fff",
                        borderColor: "#fff",
                        backgroundColor: "rgba(255,255,255,0.05)",
                      },
                    }}
                  >
                    Cancel
                  </Button>

                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, mt: 1 }}>
                    <LocalGasStation sx={{ fontSize: "0.75rem", color: "#9dabb9" }} />
                    <Typography sx={{ color: "#9dabb9", fontSize: "0.75rem" }}>
                      Est. Network Fee: <span style={{ color: "#fff" }}>Calculated on submission</span>
                    </Typography>
                  </Box>
                </Box>
              </Card>

              {/* Helper Box */}
              <Card
                sx={{
                  background: "rgba(28,33,39,0.3)",
                  border: "1px dashed #283039",
                  borderRadius: "12px",
                  p: 1,
                  display: "flex",
                  gap: 1,
                  alignItems: "flex-start",
                }}
              >
                <Info sx={{ color: "#2b8cee", fontSize: "1.25rem", mt: 0.3, flexShrink: 0 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography sx={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600 }}>
                    Smart Matching
                  </Typography>
                  <Typography sx={{ color: "#9dabb9", fontSize: "0.75rem", lineHeight: 1.4 }}>
                    Your offer will be automatically matched with borrowers meeting your criteria. Funds are locked in the smart contract until maturity.
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Mobile Footer Spacer */}
      <Box sx={{ height: 40, display: { xs: "block", lg: "none" } }} />
    </Box>
  );
};

export default LenderOfferPage;
