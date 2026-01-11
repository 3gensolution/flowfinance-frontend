# Setup Guide: Fixing Address Configuration Error

## Problem
You were getting the error: `Address "0x0" is invalid` when trying to publish an offer. This happens because the token addresses in your environment variables are not configured.

## Solution

### 1. Update Your Environment Variables

A `.env.local` file has been created with Base Sepolia testnet token addresses. You need to:

1. **For token addresses** (already populated with Base Sepolia testnet tokens):
   - `NEXT_PUBLIC_USDC_ADDRESS` - USDC token address
   - `NEXT_PUBLIC_DAI_ADDRESS` - DAI token address
   - `NEXT_PUBLIC_WETH_ADDRESS` - WETH token address
   - `NEXT_PUBLIC_WBTC_ADDRESS` - WBTC token address

2. **For smart contract addresses** (you need to fill these in):
   - `NEXT_PUBLIC_LOANMARKETPLACE_ADDRESS` - Your LoanMarketplace contract
   - `NEXT_PUBLIC_COLLATERALESCROW_ADDRESS` - Your CollateralEscrow contract
   - `NEXT_PUBLIC_FIATLOANBRIDGE_ADDRESS` - Your FiatLoanBridge contract
   - `NEXT_PUBLIC_SUPPLIERREGISTRY_ADDRESS` - Your SupplierRegistry contract
   - `NEXT_PUBLIC_CONFIGURACTION_ADDRESS` - Your Configuration contract

### 2. Fill in Your Contract Addresses

Edit `.env.local` and replace the `0x0000000000000000000000000000000000000000` placeholders with your actual deployed contract addresses from Base Sepolia testnet.

### 3. Restart Your Development Server

After updating `.env.local`, restart your Next.js development server for the changes to take effect:

```bash
npm run dev
# or
yarn dev
```

## Token Addresses Reference (Base Sepolia)

If you need to use different token addresses, you can find them on:
- [Base Sepolia Block Explorer](https://sepolia.basescan.org/)
- Token deployed addresses on your network

## What Changed

The `LenderOffer` page now includes validation to:
1. Check if token addresses are properly configured before submission
2. Display a helpful error message if addresses are missing or invalid
3. Prevent submission with `0x0` addresses

## Testing

Once your `.env.local` is properly configured:
1. Navigate to the "New Lending Offer" page
2. Fill in all form fields
3. Click "Publish Offer"
4. The transaction should now go through without the address validation error
