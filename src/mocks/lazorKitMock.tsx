import React from 'react';

// Mock implementation for LazorKit SDK since package is not published yet
// For demo purposes, simulates the API

export const LazorkitProvider = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const useWallet = () => ({
  connect: async ({ feeMode }: { feeMode: string }) => {
    console.log('Mock: Connecting with feeMode:', feeMode);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
  disconnect: async () => {
    console.log('Mock: Disconnecting');
  },
  isConnected: false, // Change to true to test connected state
  isConnecting: false,
  wallet: { smartWallet: 'MockSmartWalletAddress123456789' },
  signAndSendTransaction: async (tx: any) => {
    console.log('Mock: Signing and sending transaction:', tx);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return 'MockTransactionSignature123456789';
  },
});