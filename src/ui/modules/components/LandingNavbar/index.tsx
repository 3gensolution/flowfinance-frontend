"use client";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import { useState } from "react";
// import NextLink from "next/link";
import CloseIcon from "@mui/icons-material/Close";
// import { ROUTES_SPEC } from "@/common/constants/routes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { StyledLink } from "../StyledLink";
import { MintTokensDialog } from "../MintTokensDialog";

export const LandingNavbar = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMintDialogOpen, setIsMintDialogOpen] = useState(false);

  // const navLinks = [
  //   // { label: "Market", href: ROUTES_SPEC.marketplace },
  //   // { label: "Dashboard", href: ROUTES_SPEC.borrowerDashboard },
  //   // { label: "Governance", href: "#" },
  //   // { label: "Docs", href: "#" },
  // ];

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
      {/* <List>
        {navLinks.map((link) => (
          <ListItem key={link.label} component={NextLink} href={link.href}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(16, 25, 34, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        zIndex: 50,
      }}
      elevation={0}
    >
      <Toolbar
        disableGutters
        sx={{
          height: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: {
            sm: '0 24px',
            md: '0 48px',
            lg: '0 64px',
            xl: '0 96px',
          },
          maxWidth: '1920px',
        }}
      >
        {/* Logo */}
        <StyledLink href='/' sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              background: "linear-gradient(135deg, #10b981 0%, #2b8cee 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
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
        </StyledLink>

        {/* Desktop Navigation */}
        {/* {!isMobile && (
          <Box sx={{ display: "flex", gap: 4 }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                component={NextLink}
                href={link.href}
                sx={{
                  color: "#cbd5e1",
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
        )} */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            onClick={() => setIsMintDialogOpen(true)}
            sx={{
              color: "#cbd5e1",
              textTransform: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              "&:hover": { color: "white" },
            }}
          >
            Mint Tokens
          </Button>
          <ConnectButton />
        </Box>
      </Toolbar>
      <MintTokensDialog
        open={isMintDialogOpen}
        onClose={() => setIsMintDialogOpen(false)}
      />
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#1a2430",
            },
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};
