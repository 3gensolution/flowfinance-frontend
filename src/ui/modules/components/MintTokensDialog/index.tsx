"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Box,
    Typography,
    CircularProgress,
    Alert,
    NativeSelect,
} from "@mui/material";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";

import { useMintToken } from "@/common/hooks/api";
import { TOKEN_ASSETS, TokenSymbol } from "@/common/constants";

interface MintTokensDialogProps {
    open: boolean;
    onClose: () => void;
}

const MAX_MINT_THRESHOLD = 100000n;

// 🔹 Single source of truth
const TOKEN_SYMBOLS: TokenSymbol[] = [
    "USDC",
    "DAI",
    "WETH",
    "WBTC",
    "USDT",
];

export const MintTokensDialog: React.FC<MintTokensDialogProps> = ({
    open,
    onClose,
}) => {
    const { address } = useAccount();

    const [tokenSymbol, setTokenSymbol] =
        useState<TokenSymbol>("USDC");
    const [amount, setAmount] = useState("1000");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const { mutate: mintToken, isPending } = useMintToken();

    const handleMint = () => {
        setError(null);
        setSuccess(false);

        if (!address) {
            setError("Connect wallet first");
            return;
        }

        const token = TOKEN_ASSETS[tokenSymbol];

        if (!token?.address) {
            setError("Token address not configured");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            setError("Enter a valid amount");
            return;
        }

        if (BigInt(amount) > MAX_MINT_THRESHOLD) {
            setError(
                `You cannot mint more than ${MAX_MINT_THRESHOLD.toLocaleString()} tokens`
            );
            return;
        }

        mintToken(
            {
                tokenAddress: token.address as `0x${string}`,
                amount: parseUnits(amount, token.decimals),
            },
            {
                onSuccess: () => {
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                        onClose();
                    }, 1500);
                },
                onError: (err) => {
                    setError(
                        err instanceof Error ? err.message : "Mint failed"
                    );
                },
            }
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold" }}>
                Mint Test Tokens
            </DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        pt: 1,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Select a token and amount to mint.
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}
                    {success && (
                        <Alert severity="success">
                            Tokens minted successfully
                        </Alert>
                    )}

                    <FormControl fullWidth>
                        <InputLabel id="token-select-label">
                            Token
                        </InputLabel>
                        <NativeSelect
                            id="token-native-select"
                            value={tokenSymbol}
                            onChange={(e) =>
                                setTokenSymbol(e.target.value as TokenSymbol)
                            }
                            inputProps={{
                                name: "token",
                            }}
                        >
                            {TOKEN_SYMBOLS.map((symbol) => (
                                <option key={symbol} value={symbol}>
                                    {TOKEN_ASSETS[symbol].symbol} (
                                    {TOKEN_ASSETS[symbol].name})
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>

                    {/* Amount */}
                    <TextField
                        fullWidth
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleMint}
                    disabled={isPending}
                    startIcon={
                        isPending ? (
                            <CircularProgress size={20} />
                        ) : null
                    }
                >
                    {isPending ? "Minting..." : "Mint Tokens"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
