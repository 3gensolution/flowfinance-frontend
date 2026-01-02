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
} from "@mui/material";
import {
  Security,
  NotificationsActive,
  Tune,
  ContentCopy,
  Logout,
  Notifications,
  Wallet,
  Menu,
  Dashboard,
  MonetizationOn,
  CreditCard,
  Gavel,
  Settings,
  LightMode,
  DarkMode,
} from "@mui/icons-material";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
}

export const SettingsPage: React.FC = () => {
  const [healthFactor, setHealthFactor] = useState(1.5);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("usd");
  const [theme, setTheme] = useState("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Dashboard", icon: <Dashboard />, href: "/dashboard", isActive: false },
    { label: "Lending", icon: <MonetizationOn />, href: "/lending", isActive: false },
    { label: "Borrowing", icon: <CreditCard />, href: "/borrowing", isActive: false },
    { label: "Governance", icon: <Gavel />, href: "/governance", isActive: false },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      {/* Side Navigation */}
      <Box
        component="aside"
        sx={{
          display: { xs: "none", lg: "flex" },
          width: 288,
          flexDirection: "column",
          borderRight: "1px solid",
          borderColor: "#283039",
          backgroundColor: "#101922",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", height: "100%", flexDirection: "column", justifyContent: "space-between", p: 1 }}>
          {/* Top Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Brand */}
            <Box sx={{ display: "flex", gap: 1.5, px: 1, py: 1, alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "11px",
                  background: "rgba(43, 140, 238, 0.1)",
                  color: "#2b8cee",
                }}
              >
                <Typography sx={{ fontSize: "1.75rem" }}>◇</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff" }}>
                  FlowFinance
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#9dabb9" }}>
                  DeFi Platform
                </Typography>
              </Box>
            </Box>

            {/* Nav Items */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 1 }}>
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  component="a"
                  href={item.href}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1.5,
                    py: 1.5,
                    borderRadius: "8px",
                    color: "#9dabb9",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.05)",
                    },
                    "& svg": { fontSize: "1.25rem" },
                  }}
                >
                  <Box sx={{ color: "inherit" }}>{item.icon}</Box>
                  <Typography sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 0.5, backgroundColor: "#283039" }} />

              {/* Settings Link - Active */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1.5,
                  py: 1.5,
                  borderRadius: "8px",
                  backgroundColor: "rgba(43,140,238,0.1)",
                  color: "#2b8cee",
                  textDecoration: "none",
                  "& svg": { fontSize: "1.25rem" },
                }}
              >
                <Settings />
                <Typography sx={{ fontWeight: 500, fontSize: "0.875rem" }}>Settings</Typography>
              </Box>
            </Box>
          </Box>

          {/* User Profile */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.5,
              borderRadius: "12px",
              backgroundColor: "#1a242f",
              border: "1px solid #283039",
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "rgba(43,140,238,0.1)",
              }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYaRyssmYEGah5fUQCM5AXy7O9jeTzXOQ4DbGJv_XL3G4ZWFmlO_S0z1yO2V8RzvI3erSgBerhSPPApdFyJNqRF2kckCmyc7yAA8bUTm1x9VROEbNwq7zHMdjK2W3uanut7N0kjdSCkUMWJU6g7lGOOZcjX46kRMqZzXKzNubVCApj8Dt8_DkxNTFhtsh2Wpy73ajtpEhGvglh9UTpspvI3r-qWvsfc00NzdOHZ4y1du5aAyo6tlEM-SSY2-_noeEWD18i37ta0LE"
            />
            <Box sx={{ overflow: "hidden", flex: 1 }}>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: "bold", color: "#fff" }}>
                Alex M.
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#9dabb9", textOverflow: "ellipsis", overflow: "hidden" }}>
                0x12...48f9
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        {/* Header */}
        <Box
          component="header"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #283039",
            backgroundColor: "rgba(16,25,34,0.8)",
            backdropFilter: "blur(12px)",
            px: 2,
            py: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              sx={{ display: { lg: "none" } }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu />
            </IconButton>
            <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold", display: { xs: "none", sm: "block" }, color: "#fff" }}>
              Settings
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton size="small">
              <Notifications />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<Wallet />}
              sx={{
                backgroundColor: "#2b8cee",
                color: "#fff",
                boxShadow: "0 8px 16px rgba(43,140,238,0.3)",
                "&:hover": { backgroundColor: "#1a6bbd" },
              }}
            >
              Wallet
            </Button>
          </Box>
        </Box>

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
                          0x123...48f9
                        </Typography>
                        <IconButton size="small" sx={{ color: "#94a3b8" }}>
                          <ContentCopy sx={{ fontSize: "1.125rem" }} />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.875rem", color: "#9dabb9" }}>
                        <Typography sx={{ fontSize: "0.875rem" }}>Connected via MetaMask</Typography>
                        <Box sx={{ width: 4, height: 4, backgroundColor: "#94a3b8", borderRadius: "50%" }} />
                        <Typography sx={{ color: "#10b981", fontWeight: 500 }}>Active</Typography>
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
                  dark: { border: "1px solid #283039" },
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
                        dark: { border: "1px solid #283039" },
                        borderRadius: "8px",
                        color: "#000",
                        dark: { color: "#fff" },
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
                        dark: { border: "1px solid #283039" },
                        borderRadius: "8px",
                        color: "#000",
                        dark: { color: "#fff" },
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
                        dark: { border: "1px solid #283039" },
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
                            dark: { color: "#2b8cee" },
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
    </Box>
  );
};
