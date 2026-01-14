import React, { useState } from 'react';

// Mock implementation for LazorKit SDK since package is not published yet
// For demo purposes, simulates the API

export const LazorkitProvider = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [wallet, setWallet] = useState<{ smartWallet: string } | null>(null);

  return {
    connect: async ({ feeMode }: { feeMode?: string } = {}) => {
      setIsConnecting(true);
      console.log('✅ Mock: Passkey auth success');
      void feeMode; // Mark as used to satisfy TypeScript

      // Simulate async connection
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockWallet = { smartWallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM' };
      setWallet(mockWallet);
      setIsConnected(true);
      setIsConnecting(false);

      return mockWallet;
    },
    disconnect: () => {
      console.log('Mock: Disconnected');
      setIsConnected(false);
      setWallet(null);
    },
    isConnected,
    isConnecting,
    wallet,
    signAndSendTransaction: async (tx: any) => {
      console.log('✅ Mock: Gasless USDC tx success');
      void tx; // Mark as used to satisfy TypeScript

      // Simulate async transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      return '5xKqXiGaslessDemoSignature1234567890abcdef'; // Mock signature
    }
  };
};