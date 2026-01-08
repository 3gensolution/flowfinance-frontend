"use client";

import {
  Box,
  Typography
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName } from "wagmi";

export const BorrowerDashboardHeader= () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
  })

  return (
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
      <ConnectButton />
    </Box>
  );
};
