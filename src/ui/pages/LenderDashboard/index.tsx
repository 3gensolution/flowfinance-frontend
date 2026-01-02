"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  AccountBalanceWallet,
  Savings,
  TrendingUp,
  Handshake,
  History,
  AddCircle,
  Notifications,
  Menu,
  TableView,
  Bolt,
  VerticalAlignBottom,
  VerticalAlignTop,
} from "@mui/icons-material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface LoanData {
  id: string;
  asset: string;
  loanId: string;
  borrower: string;
  borrowerId: string;
  reputation: string;
  apy: string;
  returnValue: string;
  dueDate: string;
  healthScore: number;
  healthLabel: string;
  healthColor: string;
  progressColor: string;
  progressValue: number;
}

const mockLoansData: LoanData[] = [
  {
    id: "1",
    asset: "5,000 USDC",
    loanId: "#8821...a7f",
    borrower: "0x4a...e9",
    borrowerId: "0x4a...e9",
    reputation: "High Rep",
    apy: "9.2%",
    returnValue: "$5,460",
    dueDate: "Oct 24",
    healthScore: 1.25,
    healthLabel: "Good",
    healthColor: "#0bda5b",
    progressColor: "#0bda5b",
    progressValue: 75,
  },
  {
    id: "2",
    asset: "0.5 WBTC",
    loanId: "#9102...b2c",
    borrower: "0x8b...12",
    borrowerId: "0x8b...12",
    reputation: "Standard",
    apy: "7.8%",
    returnValue: "0.54 WBTC",
    dueDate: "Nov 02",
    healthScore: 1.05,
    healthLabel: "Risky",
    healthColor: "#fbbf24",
    progressColor: "#fbbf24",
    progressValue: 45,
  },
  {
    id: "3",
    asset: "12.5 ETH",
    loanId: "#7714...c9d",
    borrower: "0x2c...f1",
    borrowerId: "0x2c...f1",
    reputation: "High Rep",
    apy: "5.5%",
    returnValue: "13.1 ETH",
    dueDate: "Nov 15",
    healthScore: 1.8,
    healthLabel: "Safe",
    healthColor: "#0bda5b",
    progressColor: "#0bda5b",
    progressValue: 90,
  },
];

export const LenderDashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("30D");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          borderBottom: "1px solid #334155",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: '1920px',
            padding: {
              sm: '0 24px',
              md: '0 48px',
              lg: '0 64px',
              xl: '0 96px',
            },
            mx: "auto",
          }}
        >
          {/* Logo and Nav */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #0bda5b 0%, #2b8cee 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(43, 140, 238, 0.2)",
                }}
              >
                <Typography sx={{ fontSize: 20, color: "#fff" }}>💧</Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  letterSpacing: "-0.02em",
                  color: "#fff",
                }}
              >
                FlowFinance
              </Typography>
            </Box>

            {/* Desktop Nav */}
            {/* <Box
              component="nav"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 6,
              }}
            >
              {["Dashboard", "Market", "Wallet", "Governance"].map((item) => (
                <Typography
                  key={item}
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: item === "Dashboard" ? "#2b8cee" : "#94a3b8",
                    cursor: "pointer",
                    transition: "color 0.2s",
                    "&:hover": {
                      color: item === "Dashboard" ? "#2b8cee" : "#fff",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box> */}
          </Box>

          {/* Right Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              sx={{
                minWidth: 36,
                width: 36,
                height: 36,
                borderRadius: "50%",
                color: "#94a3b8",
                "&:hover": { backgroundColor: "rgba(100, 116, 139, 0.1)" },
              }}
            >
              <Notifications fontSize="small" />
            </Button>

            {/* Connect Wallet */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 3,
                pl: 2,
                borderLeft: "1px solid #334155",
              }}
            >
              <ConnectButton />
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg, #0bda5b 0%, #2b8cee 100%)",
                  padding: "2px",
                }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_H5AB9yrNAO7sPD9HuZGJZJ9k8heEFskElKi1U6u3maoEk-yKQ8KSiGH03x9Jb5xAuPsFuoDo2loVRoiqar85YMXneMkvmxmCIFbl_viFFkrh2dmUHqJfFPFVb8AvsjyRCPsOPoN0x1nrncsP3Clc1LydgLfleRP5ugCXHfTcnJrpWhPMqUzPuJdlfv09ol8jck4QfO13B92RTgV8KcvUEYLE_dm_QhCS8I2Ua5kvJYfOxBTBxUtKeeM3JS_XcRsXNc0CM2-8rnY"
              />
            </Box>

            {/* Mobile Menu */}
            <Button
              sx={{
                display: { md: "none" },
                minWidth: 36,
                width: 36,
                height: 36,
                borderRadius: "8px",
                border: "1px solid #334155",
                color: "#94a3b8",
              }}
            >
              <Menu fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          maxWidth: '1920px',
          padding: {
            sm: '24px',
            md: '48px',
            lg: '64px',
            xl: '96px',
          },
          mx: "auto",
        }}
      >
        {/* Page Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            lg: { alignItems: "flex-end" },
            justifyContent: "space-between",
            gap: 3,
            mb: 4,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: { xs: "1.875rem", md: "2.25rem" }, fontWeight: "bold", mb: 1 }}>
              Welcome back, Lender
            </Typography>
            <Typography sx={{ color: "#94a3b8", maxWidth: "45rem" }}>
              Here&apos;s what&apos;s happening with your portfolio today. You have{" "}
              <span style={{ color: "#2b8cee", fontWeight: 500 }}>3 loans</span> nearing maturity.
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<History />}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                border: "1px solid #334155",
                color: "#e2e8f0",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                "&:hover": { backgroundColor: "rgba(100, 116, 139, 0.1)" },
              }}
            >
              History
            </Button>
            <Button
              variant="contained"
              startIcon={<AddCircle />}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                background: "linear-gradient(135deg, #0bda5b 0%, #2b8cee 100%)",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                boxShadow: "0 10px 25px rgba(43, 140, 238, 0.2)",
                "&:hover": { opacity: 0.9 },
              }}
            >
              New Deposit
            </Button>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2,
            mb: 4,
          }}
        >
          {[
            {
              title: "Total Value Lent",
              value: "$124,500.00",
              change: "2.1%",
              label: "vs last month",
              Icon: AccountBalanceWallet,
              color: "#2b8cee",
            },
            {
              title: "Total Interest Earned",
              value: "+$3,240.50",
              change: "5.4%",
              label: "all time",
              Icon: Savings,
              color: "#0bda5b",
            },
            {
              title: "Average APY",
              value: "8.4%",
              change: "+0.2%",
              label: "weighted avg",
              Icon: null,
              color: "#2b8cee",
            },
            {
              title: "Active Loans",
              value: "12",
              change: "0 closed",
              label: "this week",
              Icon: Handshake,
              color: "#60a5fa",
            },
          ].map((card) => (
              <Card
                key={card.title}
                sx={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  p: 3,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: "rgba(43, 140, 238, 0.5)" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    p: 2,
                    opacity: 0.1,
                    transition: "opacity 0.2s",
                    fontSize: "3.75rem",
                  }}
                >
                  {card.Icon && <card.Icon sx={{ fontSize: "3.75rem" }} />}
                  {!card.Icon && <Typography sx={{ fontSize: "3.75rem" }}>%</Typography>}
                </Box>

                <Box sx={{ position: "relative", zIndex: 10 }}>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: "#94a3b8", mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff", mb: 1 }}>
                    {card.value}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      icon={<TrendingUp sx={{ fontSize: "0.875rem !important" }} />}
                      label={card.change}
                      sx={{
                        backgroundColor: "rgba(11, 218, 91, 0.1)",
                        color: "#0bda5b",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        height: "auto",
                        padding: "4px 8px",
                      }}
                    />
                    <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>{card.label}</Typography>
                  </Box>
                </Box>
              </Card>
          ))}
        </Box>

        {/* Main Content Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {/* Active Loans Table */}
          <Box sx={{ gridColumn: { xs: "1", lg: "span 2" } }}>
            <Card
              sx={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {/* Table Header */}
              <Box sx={{ p: 3, borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableView sx={{ color: "#2b8cee", fontSize: "1.25rem" }} />
                  <Typography sx={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff" }}>
                    Active Loans
                  </Typography>
                </Box>
                <Button
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#2b8cee",
                    textTransform: "none",
                    "&:hover": { color: "#1a6bbd" },
                  }}
                >
                  View All
                </Button>
              </Box>

              {/* Table */}
              <TableContainer sx={{ maxHeight: "100%", overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "rgba(30, 41, 59, 0.5)", borderBottom: "1px solid #334155" }}>
                      <TableCell
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          py: 2,
                        }}
                      >
                        Asset / Loan ID
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          py: 2,
                        }}
                      >
                        Borrower
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          py: 2,
                        }}
                      >
                        Details
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          py: 2,
                        }}
                      >
                        Health
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          py: 2,
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ "& tr": { borderBottom: "1px solid #334155" }, "& tr:hover": { backgroundColor: "rgba(100, 116, 139, 0.05)" } }}>
                    {mockLoansData.map((loan) => (
                      <TableRow key={loan.id}>
                        {/* Asset Column */}
                        <TableCell sx={{ py: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                                color: "#3b82f6",
                              }}
                            >
                              💰
                            </Avatar>
                            <Box>
                              <Typography sx={{ fontWeight: "bold", color: "#fff", fontSize: "0.875rem" }}>
                                {loan.asset}
                              </Typography>
                              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", fontFamily: "monospace" }}>
                                {loan.loanId}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        {/* Borrower Column */}
                        <TableCell sx={{ py: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, backgroundColor: "#475569" }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXLy3xqXbLBfWfHWN5blwaXCAgSjxJ0YrhXIp3IOQ6h_sQOawwyW8cxolSFZkHywYVmdLyVbaUwbvJCbxY2PtLWhkE4qEqK_8AgSIHbPxYcBrRJuI9blFuoiOti7hKjEAFni1cvKIVjlWQYXO0q0L5meC7FjB5GosVBW-dDgT2BzJWoOZIbHkFpzCwRATYfJ4W1KfqdDX1ZvbWlVJCGdsuspISPqJ0OHbHVvd4limGWkwVy3tV9SnOAgtOu6qI-HiBEJZ9rsUFrhI" />
                            <Typography sx={{ fontWeight: 500, color: "#e2e8f0", fontSize: "0.875rem" }}>
                              {loan.borrower}
                            </Typography>
                          </Box>
                          {loan.reputation && (
                            <Chip
                              label={loan.reputation}
                              sx={{
                                mt: 1,
                                backgroundColor: "rgba(11, 218, 91, 0.1)",
                                color: "#0bda5b",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                height: "auto",
                                padding: "4px 8px",
                              }}
                            />
                          )}
                        </TableCell>

                        {/* Details Column */}
                        <TableCell sx={{ py: 3 }}>
                          <Stack spacing={1}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: 128 }}>
                              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>APY:</Typography>
                              <Typography sx={{ fontWeight: "bold", color: "#0bda5b", fontSize: "0.75rem" }}>
                                {loan.apy}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: 128 }}>
                              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>Return:</Typography>
                              <Typography sx={{ fontWeight: 500, color: "#fff", fontSize: "0.75rem" }}>
                                {loan.returnValue}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: 128 }}>
                              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>Due:</Typography>
                              <Typography sx={{ fontWeight: 500, color: "#cbd5e1", fontSize: "0.75rem" }}>
                                {loan.dueDate}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        {/* Health Column */}
                        <TableCell sx={{ py: 3 }}>
                          <Box sx={{ width: 96 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", mb: 1 }}>
                              <Typography sx={{ color: "#94a3b8" }}>{loan.healthScore}</Typography>
                              <Typography sx={{ fontWeight: "bold", color: loan.healthColor }}>
                                {loan.healthLabel}
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={loan.progressValue}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: "#475569",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: loan.progressColor,
                                  borderRadius: 3,
                                },
                              }}
                            />
                          </Box>
                        </TableCell>

                        {/* Actions Column */}
                        <TableCell align="right" sx={{ py: 3 }}>
                          <Button
                            size="small"
                            sx={{
                              px: 2,
                              py: 1,
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              borderRadius: "6px",
                              border: "1px solid #475569",
                              color: "#e2e8f0",
                              textTransform: "none",
                              "&:hover": { backgroundColor: "rgba(100, 116, 139, 0.1)" },
                            }}
                          >
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>

          {/* Right Side Panel */}
          <Box>
            <Stack spacing={3}>
              {/* Portfolio Performance Chart */}
              <Card
                sx={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  p: 3,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                  <Box>
                    <Typography sx={{ fontWeight: "bold", color: "#fff", mb: 1 }}>
                      Portfolio Performance
                    </Typography>
                    <Typography sx={{ fontSize: "0.875rem", color: "#94a3b8" }}>
                      Cumulative Earnings (30D)
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      backgroundColor: "#0f172a",
                      borderRadius: "8px",
                      p: 0.5,
                    }}
                  >
                    {["30D", "1Y"].map((period) => (
                      <Button
                        key={period}
                        onClick={() => setTimeRange(period)}
                        sx={{
                          px: 1,
                          py: 0.5,
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          borderRadius: "6px",
                          textTransform: "none",
                          backgroundColor: timeRange === period ? "#475569" : "transparent",
                          color: timeRange === period ? "#fff" : "#94a3b8",
                          boxShadow: timeRange === period ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                          "&:hover": { color: "#fff" },
                        }}
                      >
                        {period}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Stats */}
                <Box sx={{ mb: 3, display: "flex", alignItems: "baseline", gap: 2 }}>
                  <Typography sx={{ fontSize: "1.875rem", fontWeight: "bold", color: "#fff" }}>
                    $3,240.50
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: "#0bda5b" }}>
                    +12%
                  </Typography>
                </Box>

                {/* Simple Chart */}
                <Box sx={{ width: "100%", height: 180, position: "relative", mb: 2 }}>
                  <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#2b8cee" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#2b8cee" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#0bda5b" />
                        <stop offset="100%" stopColor="#2b8cee" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" x2="300" y1="25" y2="25" stroke="#334155" strokeDasharray="4 4" opacity="0.3" />
                    <line x1="0" x2="300" y1="50" y2="50" stroke="#334155" strokeDasharray="4 4" opacity="0.3" />
                    <line x1="0" x2="300" y1="75" y2="75" stroke="#334155" strokeDasharray="4 4" opacity="0.3" />
                    {/* Area Path */}
                    <path
                      d="M0,80 Q30,75 50,60 T100,55 T150,40 T200,30 T250,15 T300,5 V100 H0 Z"
                      fill="url(#chartGradient)"
                    />
                    {/* Line Path */}
                    <path
                      d="M0,80 Q30,75 50,60 T100,55 T150,40 T200,30 T250,15 T300,5"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="2.5"
                    />
                  </svg>
                </Box>

                {/* X Axis Labels */}
                <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94a3b8", mt: 1 }}>
                  <span>Oct 1</span>
                  <span>Oct 15</span>
                  <span>Oct 30</span>
                </Box>
              </Card>

              {/* Quick Liquidity Panel */}
              <Card
                sx={{
                  background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  p: 3,
                  boxShadow: "0 10px 25px rgba(43, 140, 238, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative background */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 128,
                    height: 128,
                    backgroundColor: "rgba(43, 140, 238, 0.2)",
                    borderRadius: "50%",
                    filter: "blur(40px)",
                  }}
                />

                <Box sx={{ position: "relative", zIndex: 10 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "8px",
                        backgroundColor: "rgba(43, 140, 238, 0.2)",
                        color: "#2b8cee",
                      }}
                    >
                      <Bolt fontSize="small" />
                    </Box>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.125rem", color: "#fff" }}>
                      Quick Liquidity
                    </Typography>
                  </Box>

                  <Typography sx={{ color: "#cbd5e1", fontSize: "0.875rem", mb: 3, lineHeight: 1.6 }}>
                    Rapidly deploy more capital to the highest yield pools or withdraw to your wallet.
                  </Typography>

                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                    <Box>
                      <Button
                        fullWidth
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          p: 2,
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                          textTransform: "none",
                          transition: "all 0.2s",
                          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                        }}
                      >
                        <VerticalAlignBottom sx={{ color: "#0bda5b" }} />
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Deposit</Typography>
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        fullWidth
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          p: 2,
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                          textTransform: "none",
                          transition: "all 0.2s",
                          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                        }}
                      >
                        <VerticalAlignTop sx={{ color: "#2b8cee" }} />
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>Withdraw</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LenderDashboardPage;
