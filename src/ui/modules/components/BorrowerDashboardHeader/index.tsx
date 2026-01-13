"use client";

import {
  Box,
  Typography,
  Button
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName } from "wagmi";
import { useState } from "react";
import { MintTokensDialog } from "../MintTokensDialog";

export const BorrowerDashboardHeader = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
  })
  const [isMintDialogOpen, setIsMintDialogOpen] = useState(false);

  return (
    <>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #283039",
          backgroundColor: "#101922",
          px: 3,
          py: 2,
          shrink: 0,
        }}
      >
        <Box></Box>
        {ensName && (
          <Typography sx={{ color: "white", fontSize: "1.125rem", fontWeight: "bold" }}>
            Welcome {ensName}
          </Typography>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            onClick={() => setIsMintDialogOpen(true)}
            sx={{
              color: "#94a3b8",
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
      </Box>
      <MintTokensDialog
        open={isMintDialogOpen}
        onClose={() => setIsMintDialogOpen(false)}
      />
    </>
  );
};
