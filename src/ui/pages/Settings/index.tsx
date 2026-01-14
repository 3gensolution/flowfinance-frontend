"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  Avatar,
  Switch,
  Select,
  MenuItem,
  Slider,
  Divider,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Security,
  NotificationsActive,
  Tune,
  ContentCopy,
  Logout,
  LightMode,
  DarkMode,
  Store,
  VerifiedUser,
  CloudUpload,
} from "@mui/icons-material";
import { BorrowerDashboardHeader, BorrowerDashboardSidebar } from "@/ui/modules/components";
import { useAccount, useBalance } from "wagmi";
import { formatEther, parseEther } from "viem";
import { useSupplierDetails, useMinimumSupplierStake } from "@/common/hooks/api/query/useSupplierData";
import { uploadToIPFS } from "@/common/utils/ipfs";
import {
  useAddSupplierStake,
  useWithdrawSupplierStake,
  useUpdateSupplierKYC,
  useDeactivateSupplier,
  useReactivateSupplier,
  useRegisterSupplier,
} from "@/common/hooks/api/mutation/useSupplierMutations";

export const SettingsPage: React.FC = () => {
  const { address } = useAccount();
  const [healthFactor, setHealthFactor] = useState(1.5);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("usd");
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("Settings");

  // Supplier UI State
  const [stakeAmount, setStakeAmount] = useState("");
  const [kycHash, setKycHash] = useState("");
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [isKycDialogOpen, setIsKycDialogOpen] = useState(false);

  // IPFS Upload State
  const [isUploadingKyc, setIsUploadingKyc] = useState(false);
  const [isUploadingRegisterKyc, setIsUploadingRegisterKyc] = useState(false);

  // Registration State
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerRegNum, setRegisterRegNum] = useState("");
  const [registerKycHash, setRegisterKycHash] = useState("");
  const [registerStake, setRegisterStake] = useState("");

  // Queries
  const { data: supplierDetails, isLoading: isSupplierLoading } = useSupplierDetails(address);
  const { data: minStake } = useMinimumSupplierStake();
  const { data: userBalance } = useBalance({ address });

  // Mutations
  const { mutateAsync: addStake, isPending: isAddingStake } = useAddSupplierStake();
  const { mutateAsync: withdrawStake, isPending: isWithdrawingStake } = useWithdrawSupplierStake();
  const { mutateAsync: updateKYC, isPending: isUpdatingKYC } = useUpdateSupplierKYC();
  const { mutateAsync: deactivateSupplier, isPending: isDeactivating } = useDeactivateSupplier();
  const { mutateAsync: reactivateSupplier, isPending: isReactivating } = useReactivateSupplier();
  const { mutateAsync: registerSupplier, isPending: isRegistering } = useRegisterSupplier();

  const handleAddStake = async () => {
    try {
      if (!stakeAmount) return;
      await addStake(parseEther(stakeAmount));
      setStakeAmount("");
      setIsDepositDialogOpen(false);
    } catch (error) {
      console.error("Failed to add stake:", error);
    }
  };

  const handleWithdrawStake = async () => {
    try {
      await withdrawStake();
      setIsWithdrawDialogOpen(false);
    } catch (error) {
      console.error("Failed to withdraw stake:", error);
    }
  };

  const handleUpdateKYC = async () => {
    try {
      if (!kycHash) return;
      await updateKYC(kycHash);
      setKycHash("");
      setIsKycDialogOpen(false);
    } catch (error) {
      console.error("Failed to update KYC:", error);
    }
  };

  const handleRegister = async () => {
    try {
      if (!registerName || !registerRegNum || !registerKycHash || !registerStake) return;

      await registerSupplier({
        supplierType: 0, // Default to individual for now, could be an enum
        name: registerName,
        businessRegistrationNumber: registerRegNum,
        kycDocumentHash: registerKycHash,
        stakeAmount: parseEther(registerStake)
      });

      setRegisterName("");
      setRegisterRegNum("");
      setRegisterKycHash("");
      setRegisterStake("");
      setIsRegisterDialogOpen(false);
    } catch (error) {
      console.error("Failed to register supplier", error);
    }
  };

  // @ts-ignore
  const isSupplierRegistered = !!supplierDetails && supplierDetails.status !== 0; // Assuming 0 is Unregistered/None

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <BorrowerDashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        {/* Header */}
        <BorrowerDashboardHeader />

        {/* Scrollable Content */}
        <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <Box sx={{ px: { xs: 1, md: 2, lg: 3 }, py: 2, maxWidth: 1280, mx: "auto", width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Page Intro */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 1 }}>
              <Typography sx={{ fontSize: { xs: "1.875rem", md: "2.25rem" }, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff" }}>
                Account Settings
              </Typography>
              <Typography sx={{ color: "#9dabb9", fontSize: "1.125rem" }}>
                Manage your wallet connection, security preferences, and interface notifications.
              </Typography>
            </Box>

            {/* Wallet & Security Section */}
            <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Security sx={{ color: "#2b8cee", fontSize: "1.5rem" }} />
                <Typography sx={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff" }}>
                  Wallet & Security
                </Typography>
              </Box>

              <Card
                sx={{
                  background: "#1a242f",
                  border: "1px solid #283039",
                  borderRadius: "12px",
                  p: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between" }}>
                  {/* Wallet Info */}
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        sx={{
                          width: 64,
                          height: 64,
                          border: "2px solid #2b8cee",
                        }}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtieh9cy3nFQUoDDDV96EmDyMweQ0IRcku6URIpQgaPKznhOK7UNsWrxesX_VhUH-QT1doHBamgBteHXzxtB7kB5N9jjFaMqnb3OAqChmCtYGl2F6ec3nJw0t23xHSU_KLaNAv9bVnwHB7Ygr2QXMpCV-nPt5UiNHvBm7H6YoABKOMJrY0eoflEgyUrHFIHXaqJxojZoq9q2os7SrjMQ_dBWV5TD1eFMkaUx1nb7m7lZ3-wdQwLHFxXuL1SUAQ3cWU6loo4uj_TYA"
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: 20,
                          height: 20,
                          backgroundColor: "#10b981",
                          border: "2px solid #1a242f",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff" }}>
                          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not Connect"}
                        </Typography>
                        <IconButton size="small" sx={{ color: "#94a3b8" }}>
                          <ContentCopy sx={{ fontSize: "1.125rem" }} />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.875rem", color: "#9dabb9" }}>
                        <Typography sx={{ fontSize: "0.875rem" }}>Connected via MetaMask</Typography>
                        <Box sx={{ width: 4, height: 4, backgroundColor: "#94a3b8", borderRadius: "50%" }} />
                        <Typography sx={{ color: address ? "#10b981" : "#ef4444", fontWeight: 500 }}>
                          {address ? "Active" : "Disconnected"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Disconnect Button */}
                  <Button
                    sx={{
                      width: { xs: "100%", md: "auto" },
                      px: 3,
                      py: 1.25,
                      borderRadius: "8px",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#ef4444",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      "&:hover": { backgroundColor: "rgba(239,68,68,0.1)" },
                    }}
                    startIcon={<Logout sx={{ fontSize: "1.125rem" }} />}
                  >
                    Disconnect Wallet
                  </Button>
                </Box>

                {/* KYC Section */}
                <Divider sx={{ my: 2, backgroundColor: "#283039" }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>
                      Identity Verification (KYC)
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#9dabb9", mt: 0.5 }}>
                      Required for Fiat On-ramp and borrowing limits over $10k.
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { xs: "space-between", sm: "flex-end" }, width: { xs: "100%", sm: "auto" } }}>
                    <Chip
                      label="VERIFIED"
                      sx={{
                        backgroundColor: "rgba(16,185,129,0.1)",
                        color: "#10b981",
                        border: "1px solid rgba(16,185,129,0.2)",
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em",
                      }}
                    />
                    <Button
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#2b8cee",
                        textTransform: "none",
                        "&:hover": { color: "#1a6bbd" },
                      }}
                    >
                      Manage
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>

            {/* Supplier Management Section */}
            <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Store sx={{ color: "#2b8cee", fontSize: "1.5rem" }} />
                <Typography sx={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff" }}>
                  Supplier Management
                </Typography>
              </Box>

              <Card
                sx={{
                  background: "#1a242f",
                  border: "1px solid #283039",
                  borderRadius: "12px",
                  p: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                {isSupplierLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : isSupplierRegistered ? (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Supplier Details */}
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                      <Box>
                        <Typography sx={{ fontSize: "0.75rem", color: "#9dabb9" }}>Supplier Name</Typography>
                        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#fff" }}>
                          {supplierDetails?.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "0.75rem", color: "#9dabb9" }}>Registration Number</Typography>
                        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#fff" }}>
                          {supplierDetails?.businessRegistrationNumber}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "0.75rem", color: "#9dabb9" }}>Status</Typography>
                        <Chip
                          label={supplierDetails?.isActive ? "ACTIVE" : "INACTIVE"}
                          sx={{
                            mt: 0.5,
                            backgroundColor: supplierDetails?.isActive ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                            color: supplierDetails?.isActive ? "#10b981" : "#ef4444",
                            border: `1px solid ${supplierDetails?.isActive ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "0.75rem", color: "#9dabb9" }}>Staked Amount</Typography>
                        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#fff" }}>
                          {/* @ts-ignore */}
                          {supplierDetails?.stakeAmount ? supplierDetails.stakeAmount.toString() : "0"} WEI
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ backgroundColor: "#283039" }} />

                    {/* Actions */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => setIsDepositDialogOpen(true)}
                        disabled={!supplierDetails?.isActive}
                        sx={{ color: "#10b981", borderColor: "#10b981", "&:hover": { borderColor: "#059669", backgroundColor: "rgba(16,185,129,0.05)" } }}
                      >
                        Add Stake
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsWithdrawDialogOpen(true)}
                        sx={{ color: "#fbbf24", borderColor: "#fbbf24", "&:hover": { borderColor: "#d97706", backgroundColor: "rgba(251,191,36,0.05)" } }}
                      >
                        Withdraw Stake
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsKycDialogOpen(true)}
                        startIcon={<VerifiedUser />}
                      >
                        Update KYC
                      </Button>
                      {supplierDetails?.isActive ? (
                        <Button
                          variant="outlined"
                          color="error"
                          // @ts-ignore
                          onClick={() => deactivateSupplier(supplierDetails.walletAddress)}
                          disabled={isDeactivating}
                        >
                          {isDeactivating ? "Deactivating..." : "Deactivate Supplier"}
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="success"
                          // @ts-ignore
                          onClick={() => reactivateSupplier(supplierDetails!.walletAddress)}
                          disabled={isReactivating}
                        >
                          {isReactivating ? "Reactivating..." : "Reactivate Supplier"}
                        </Button>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 4 }}>
                    <Typography sx={{ color: "#9dabb9" }}>You are not registered as a supplier.</Typography>
                    <Button variant="contained" onClick={() => setIsRegisterDialogOpen(true)}>
                      Register as Supplier
                    </Button>
                  </Box>
                )}
              </Card>
            </Box>

            {/* Notifications & Alerts Section */}
            <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <NotificationsActive sx={{ color: "#2b8cee", fontSize: "1.5rem" }} />
                <Typography sx={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff" }}>
                  Notifications & Alerts
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 1 }}>
                {/* Channels Card */}
                <Card
                  sx={{
                    background: "#1a242f",
                    border: "1px solid #283039",
                    borderRadius: "12px",
                    p: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#fff" }}>
                    Channels
                  </Typography>

                  {/* Email Toggle */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography sx={{ fontWeight: 500, color: "#fff" }}>
                        Email Notifications
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#9dabb9" }}>
                        Daily summaries and security alerts
                      </Typography>
                    </Box>
                    <Switch
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#10b981" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#10b981",
                        },
                      }}
                    />
                  </Box>

                  {/* Push Toggle */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography sx={{ fontWeight: 500, color: "#fff" }}>
                        Push Notifications
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#9dabb9" }}>
                        Real-time liquidation warnings
                      </Typography>
                    </Box>
                    <Switch
                      checked={pushNotifications}
                      onChange={(e) => setPushNotifications(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#10b981" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#10b981",
                        },
                      }}
                    />
                  </Box>
                </Card>

                {/* Health Factor Warning Slider */}
                <Card
                  sx={{
                    background: "#1a242f",
                    border: "1px solid #283039",
                    borderRadius: "12px",
                    p: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#fff", mb: 1 }}>
                      Health Factor Warning
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#9dabb9", mb: 2 }}>
                      Receive an alert when your loan health factor drops below this value.
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", color: "#ef4444" }}>
                        Risky (1.0)
                      </Typography>
                      <Typography sx={{ fontSize: "1.5rem", fontWeight: 900, color: "#2b8cee" }}>
                        {healthFactor.toFixed(1)}
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", fontWeight: "bold", color: "#10b981" }}>
                        Safe (3.0)
                      </Typography>
                    </Box>
                    <Slider
                      value={healthFactor}
                      onChange={(_, newValue) => setHealthFactor(newValue as number)}
                      min={1}
                      max={3}
                      step={0.1}
                      sx={{
                        color: "#2b8cee",
                        "& .MuiSlider-track": { backgroundColor: "#2b8cee" },
                        "& .MuiSlider-rail": { backgroundColor: "#475569" },
                        "& .MuiSlider-thumb": {
                          boxShadow: "0 0 10px rgba(43,140,238,0.5)",
                        },
                      }}
                    />
                  </Box>
                </Card>
              </Box>
            </Box>

            {/* Global Preferences Section */}
            <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Tune sx={{ color: "#2b8cee", fontSize: "1.5rem" }} />
                <Typography sx={{ fontSize: "1.125rem", fontWeight: "bold", color: "#000", dark: { color: "#fff" } }}>
                  Global Preferences
                </Typography>
              </Box>

              <Card
                sx={{
                  background: "#fff",
                  dark: { background: "#1a242f" },
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "12px",
                  p: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
                  {/* Language */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", dark: { color: "#9dabb9" } }}>
                      Language
                    </Typography>
                    <Select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      sx={{
                        backgroundColor: "#f1f5f9",
                        dark: { backgroundColor: "#101922" },
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "8px",
                        color: "#000",
                        fontSize: "0.875rem",
                        "&:hover": { borderColor: "#2b8cee" },
                      }}
                    >
                      <MenuItem value="en">English (US)</MenuItem>
                      <MenuItem value="fr">Français</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                      <MenuItem value="de">Deutsch</MenuItem>
                    </Select>
                  </Box>

                  {/* Currency */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", dark: { color: "#9dabb9" } }}>
                      Display Currency
                    </Typography>
                    <Select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      sx={{
                        backgroundColor: "#f1f5f9",
                        dark: { backgroundColor: "#101922" },
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "8px",
                        color: "#000",
                        fontSize: "0.875rem",
                        "&:hover": { borderColor: "#2b8cee" },
                      }}
                    >
                      <MenuItem value="usd">USD ($)</MenuItem>
                      <MenuItem value="eur">EUR (€)</MenuItem>
                      <MenuItem value="gbp">GBP (£)</MenuItem>
                      <MenuItem value="eth">ETH (Ξ)</MenuItem>
                    </Select>
                  </Box>

                  {/* Theme */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", dark: { color: "#9dabb9" } }}>
                      Theme
                    </Typography>
                    <ToggleButtonGroup
                      value={theme}
                      exclusive
                      onChange={(_, newTheme) => {
                        if (newTheme !== null) setTheme(newTheme);
                      }}
                      sx={{
                        backgroundColor: "#f1f5f9",
                        dark: { backgroundColor: "#101922" },
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "8px",
                        p: 0.5,
                        "& .MuiToggleButton-root": {
                          border: "none",
                          color: "#000",
                          dark: { color: "#9dabb9" },
                          textTransform: "none",
                          gap: 0.5,
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          "&.Mui-selected": {
                            backgroundColor: "#fff",
                            dark: { backgroundColor: "#1a242f" },
                            color: "#000",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    >
                      <ToggleButton value="light" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                        <LightMode sx={{ fontSize: "1.125rem" }} />
                        Light
                      </ToggleButton>
                      <ToggleButton value="dark" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                        <DarkMode sx={{ fontSize: "1.125rem" }} />
                        Dark
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Box>
              </Card>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, pb: 3 }}>
              <Button
                sx={{
                  px: 2,
                  py: 1.25,
                  borderRadius: "8px",
                  color: "#64748b",
                  dark: { color: "#fff" },
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.05)", dark: { backgroundColor: "rgba(255,255,255,0.05)" } },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  px: 2,
                  py: 1.25,
                  borderRadius: "8px",
                  backgroundColor: "#2b8cee",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0 8px 16px rgba(43,140,238,0.2)",
                  "&:hover": { backgroundColor: "#1a6bbd" },
                  "&:active": { transform: "scale(0.95)" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Dialogs */}
      <Dialog open={isDepositDialogOpen} onClose={() => setIsDepositDialogOpen(false)}>
        <DialogTitle>Add Stake</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Amount (ETH)"
            type="number"
            fullWidth
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            inputProps={{ step: "0.00001" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDepositDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddStake} disabled={isAddingStake}>
            {isAddingStake ? "Adding..." : "Add Stake"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isWithdrawDialogOpen} onClose={() => setIsWithdrawDialogOpen(false)}>
        <DialogTitle>Withdraw Stake</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to withdraw your stake?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsWithdrawDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleWithdrawStake} disabled={isWithdrawingStake} color="warning">
            {isWithdrawingStake ? "Withdrawing..." : "Withdraw"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isKycDialogOpen} onClose={() => setIsKycDialogOpen(false)}>
        <DialogTitle>Update KYC Document</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Upload your KYC document to IPFS. The hash will be automatically generated.
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={isUploadingKyc ? <CircularProgress size={20} /> : <CloudUpload />}
              disabled={isUploadingKyc}
            >
              {isUploadingKyc ? "Uploading to IPFS..." : "Upload Document"}
              <input
                type="file"
                hidden
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    setIsUploadingKyc(true);
                    try {
                      const hash = await uploadToIPFS(e.target.files[0]);
                      setKycHash(hash);
                    } catch (err) {
                      console.error(err);
                      // Ideally show error toast here
                    } finally {
                      setIsUploadingKyc(false);
                    }
                  }
                }}
              />
            </Button>
            <TextField
              label="IPFS Hash"
              fullWidth
              value={isUploadingKyc ? "" : kycHash}
              placeholder="Hash will appear here after upload"
              InputProps={{
                readOnly: true,
                endAdornment: isUploadingKyc ? <CircularProgress size={20} /> : null,
              }}
              variant="filled"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsKycDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateKYC} disabled={isUpdatingKYC || !kycHash || isUploadingKyc}>
            {isUpdatingKYC ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isRegisterDialogOpen} onClose={() => setIsRegisterDialogOpen(false)}>
        <DialogTitle>Register as Supplier</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Name"
            fullWidth
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
          />
          <TextField
            label="Business Registration Number"
            fullWidth
            value={registerRegNum}
            onChange={(e) => setRegisterRegNum(e.target.value)}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">KYC Document</Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={isUploadingRegisterKyc ? <CircularProgress size={20} /> : <CloudUpload />}
              disabled={isUploadingRegisterKyc}
            >
              {isUploadingRegisterKyc ? "Uploading to IPFS..." : "Upload KYC Document"}
              <input
                type="file"
                hidden
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    setIsUploadingRegisterKyc(true);
                    try {
                      const hash = await uploadToIPFS(e.target.files[0]);
                      setRegisterKycHash(hash);
                    } catch (err) {
                      console.error(err);
                    } finally {
                      setIsUploadingRegisterKyc(false);
                    }
                  }
                }}
              />
            </Button>
            <TextField
              label="IPFS Hash"
              fullWidth
              value={isUploadingRegisterKyc ? "" : registerKycHash}
              placeholder="Hash will appear here after upload"
              InputProps={{
                readOnly: true,
                endAdornment: isUploadingRegisterKyc ? <CircularProgress size={20} /> : null,
              }}
              variant="filled"
              size="small"
              helperText="Automatically generated from upload"
            />
          </Box>

          <TextField
            label="Initial Stake (ETH)"
            type="number"
            fullWidth
            value={registerStake}
            onChange={(e) => setRegisterStake(e.target.value)}
            helperText={minStake ? `Minimum stake required: ${formatEther(minStake)} ETH` : "Loading requirement..."}
            error={!!minStake && !!registerStake && (parseEther(registerStake) < minStake || (!!userBalance && parseEther(registerStake) > userBalance.value))}
            inputProps={{ step: "0.00001" }}
          />
          {userBalance && registerStake && parseEther(registerStake) > userBalance.value && (
            <Typography color="error" variant="caption">
              Insufficient ETH balance. You have {userBalance.formatted} {userBalance.symbol}.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRegisterDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleRegister}
            disabled={
              isRegistering ||
              !registerKycHash ||
              !registerName ||
              !registerRegNum ||
              !registerStake ||
              isUploadingRegisterKyc ||
              (!!minStake && !!registerStake && parseEther(registerStake) < minStake) ||
              (!!userBalance && !!registerStake && parseEther(registerStake) > userBalance.value)
            }
            variant="contained"
          >
            {isRegistering ? "Registering..." : "Register"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
