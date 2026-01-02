"use client";

import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { defaultTheme } from "@/ui/assets/styles";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "@/common/lib";
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { WagmiProvider } from 'wagmi';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={defaultTheme}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              {children}
              <Toaster
                position="bottom-right"
                richColors
                toastOptions={{
                  duration: 3000,
                  className: 'custom-toast',
                  style: {
                    padding: '12px 16px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  },
                }}
              />
              </LocalizationProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </RainbowKitProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </WagmiProvider>
  );
};
