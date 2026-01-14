import React from 'react';

// Mock implementation for LazorKit SDK since package is not published yet
// For demo purposes, simulates the API

export const LazorkitProvider = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const useWallet = () => ({
  connect: async ({ feeMode }: { feeMode?: string } = {}) => {
    console.log('✅ Mock: Passkey auth success');
    return { smartWallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM' };
  },
  disconnect: () => console.log('Mock: Disconnected'),
  isConnected: true,
  isConnecting: false,
  wallet: { smartWallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM' },
  signAndSendTransaction: async (tx: any) => {
    console.log('✅ Mock: Gasless USDC tx success');
    return '5xK...abc123'; // Mock signature
  }
});