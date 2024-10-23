"use client";

import React, { ReactNode, useEffect } from "react";
import { config, projectId, metadata } from "@/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiConfig } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal with custom theme variables
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#1f2937",
    "--w3m-border-radius-master": "8px",
  },
});

export default function Web3ModalProvider({ children, initialState }: { children: ReactNode; initialState?: State }) {
  useEffect(() => {
    document.body.classList.add("web3modal-theme");
    return () => {
      document.body.classList.remove("web3modal-theme");
    };
  }, []);

  return (
    <WagmiConfig config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}
