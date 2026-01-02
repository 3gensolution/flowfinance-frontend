"use client";

import {
  Box,
  Typography,
  Button,
  Link,
  Card,
} from "@mui/material";
import { useRouter } from "next/navigation";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";
import ChatIcon from "@mui/icons-material/Chat";
import CodeIcon from "@mui/icons-material/Code";
import { ROUTES_SPEC } from "@/common/constants/routes";

export const CTASection = () => {
  const router = useRouter();

  const handleLaunchApp = () => {
    router.push(ROUTES_SPEC.marketplace);
  };
  return (
    <Box component="section" sx={{ py: 12, px: 2 }}>
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
        <Card
          sx={{
            position: "relative",
            background: "linear-gradient(180deg, #1a2430 0%, #101922 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 3,
            p: { xs: 4, md: 8 },
            textAlign: "center",
            overflow: "hidden",
          }}
          elevation={0}
        >
          {/* Top border accent */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, transparent, rgba(43, 140, 238, 0.5), transparent)",
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              fontWeight: 900,
              mb: 3,
            }}
          >
            Ready to start earning?
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "1.125rem",
              maxWidth: 600,
              mx: "auto",
              mb: 4,
            }}
          >
            Join thousands of users who trust FlowFinance for their DeFi lending needs.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<RocketLaunchIcon />}
            onClick={handleLaunchApp}
            sx={{
              height: 56,
              paddingX: 5,
              fontSize: "1.125rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #2b8cee 0%, #1f62c4 100%)",
              boxShadow: "0 20px 32px rgba(43, 140, 238, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #5fa3f5 0%, #2b8cee 100%)",
                boxShadow: "0 24px 40px rgba(43, 140, 238, 0.4)",
              },
            }}
          >
            Launch App
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export const FooterSection = () => {
  const footerLinks = {
    Protocol: [
      { label: "Markets", href: "#" },
      { label: "Prices", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Audit", href: "#" },
    ],
    Governance: [
      { label: "Voting", href: "#" },
      { label: "Forum", href: "#" },
      { label: "Proposals", href: "#" },
    ],
    Support: [
      { label: "Help Center", href: "#" },
      { label: "Bug Bounty", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a2430",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        pt: 8,
        pb: 4,
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
        {/* Main Footer Content */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 4, mb: 8 }}>
          {/* Brand Section */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
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
                  fontWeight: 700,
                }}
              >
                ∞
              </Box>
              <Typography sx={{ fontSize: "1.25rem", fontWeight: 700 }}>
                FlowFinance
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "#94a3b8",
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              The most trusted decentralized peer-to-peer lending protocol on the blockchain.
              Built for the community.
            </Typography>

            {/* Social Links */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {[
                { icon: PublicIcon, label: "Twitter" },
                { icon: ChatIcon, label: "Discord" },
                { icon: CodeIcon, label: "GitHub" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href="#"
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#2b8cee",
                    },
                  }}
                >
                  <social.icon sx={{ fontSize: 16 }} />
                </Link>
              ))}
            </Box>
          </Box>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <Box key={section}>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "white",
                  mb: 2,
                }}
              >
                {section}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      fontSize: "0.875rem",
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "color 0.3s",
                      "&:hover": {
                        color: "#2b8cee",
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom Footer */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            pt: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: "0.875rem", color: "#64748b" }}>
            © 2024 FlowFinance. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", gap: 3, fontSize: "0.875rem", color: "#64748b" }}>
            <span>v2.1.0</span>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }}
              />
              Systems Operational
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    // </Box>
  );
};
