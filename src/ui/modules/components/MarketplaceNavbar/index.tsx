"use client";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import NextLink from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ROUTES_SPEC } from "@/common/constants/routes";
import { MintTokensDialog } from "../MintTokensDialog";

export const MarketplaceNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMintDialogOpen, setIsMintDialogOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: ROUTES_SPEC.borrowerDashboard },
    { label: "Marketplace", href: ROUTES_SPEC.marketplace },
    { label: "My Loans", href: ROUTES_SPEC.borrowerDashboard },
    { label: "Governance", href: "#" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ p: 2, width: 250 }}>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <CloseIcon />
      </IconButton>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.label} component={NextLink} href={link.href}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(16, 25, 34, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(40, 48, 57, 1)",
        zIndex: 50,
      }}
      elevation={0}
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
        <Toolbar
          disableGutters
          sx={{
            height: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                background: "conic-gradient(from 180deg at 50% 50%, #2b8cee 0deg, #2b8cee 360deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              ∞
            </Box>
            <Box
              component="span"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.5px",
              }}
            >
              FlowFinance
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 6 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  component={NextLink}
                  href={link.href}
                  sx={{
                    color: "#9dabb9",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          )}

          {/* Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isMobile && (
              <>
                <Button
                  onClick={() => setIsMintDialogOpen(true)}
                  sx={{
                    color: "#9dabb9",
                    textTransform: "none",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  Mint Tokens
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    height: 40,
                    paddingX: 2.5,
                    backgroundColor: "#2b8cee",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(43, 140, 238, 0.9)",
                    },
                  }}
                  startIcon={<AccountBalanceWalletIcon />}
                >
                  Connect Wallet
                </Button>
              </>
            )}

            {isMobile && (
              <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Box>

      <MintTokensDialog
        open={isMintDialogOpen}
        onClose={() => setIsMintDialogOpen(false)}
      />

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: "#101922",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};
