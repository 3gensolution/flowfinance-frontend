"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";

export interface PendingRequest {
  id: string;
  assetRequested: string;
  collateralOffered: string;
  status: "Matching" | "Pending" | "Approved";
  onCancelClick: () => void;
}

export interface PendingRequestsTableProps {
  requests: PendingRequest[];
}

export const PendingRequestsTable: React.FC<PendingRequestsTableProps> = ({
  requests,
}) => {
  const getStatusColor = (status: string): { bg: string; text: string } => {
    switch (status) {
      case "Matching":
        return { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6" };
      case "Pending":
        return { bg: "rgba(251, 191, 36, 0.1)", text: "#fbbf24" };
      case "Approved":
        return { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e" };
      default:
        return { bg: "rgba(148, 163, 184, 0.1)", text: "#94a3b8" };
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 5 }}>
      {/* Header */}
      <Typography
        sx={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          color: "white",
        }}
      >
        Pending Requests
      </Typography>

      {/* Table */}
      <Box
        sx={{
          overflow: "x-auto",
          borderRadius: "0.75rem",
          border: "1px solid #283039",
          backgroundColor: "#1e2732",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(40, 48, 57, 0.5)", borderBottom: "1px solid #283039" }}>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Request ID
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Asset Requested
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Collateral Offered
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#a0adb8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  textAlign: "right",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => {
              const statusColor = getStatusColor(request.status);
              return (
                <TableRow
                  key={request.id}
                  sx={{
                    borderBottom: "1px solid #283039",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                    },
                  }}
                >
                  <TableCell sx={{ p: 2, fontSize: "0.875rem", fontWeight: 500, color: "white" }}>
                    {request.id}
                  </TableCell>
                  <TableCell sx={{ p: 2, fontSize: "0.875rem", color: "#cbd5e1" }}>
                    {request.assetRequested}
                  </TableCell>
                  <TableCell sx={{ p: 2, fontSize: "0.875rem", color: "#cbd5e1" }}>
                    {request.collateralOffered}
                  </TableCell>
                  <TableCell sx={{ p: 2 }}>
                    <Chip
                      label={request.status}
                      sx={{
                        backgroundColor: statusColor.bg,
                        color: statusColor.text,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        border: `1px solid ${statusColor.text}40`,
                        "& .MuiChip-icon": {
                          color: statusColor.text,
                        },
                      }}
                      icon={
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: statusColor.text,
                            animation: request.status === "Matching" ? "pulse 2s infinite" : "none",
                            "@keyframes pulse": {
                              "0%, 100%": { opacity: 1 },
                              "50%": { opacity: 0.5 },
                            },
                          }}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell sx={{ p: 2, textAlign: "right" }}>
                    <Button
                      size="small"
                      onClick={request.onCancelClick}
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#ef4444",
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        justifyContent: "flex-end",
                        ml: "auto",
                        "&:hover": {
                          color: "#dc2626",
                        },
                      }}
                    >
                      <Cancel sx={{ fontSize: 16 }} />
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
