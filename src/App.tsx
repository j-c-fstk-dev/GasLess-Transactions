import { useEffect, useState } from 'react';
import { LazorkitProvider, useWallet } from './mocks/lazorKitMock';
import { BiometricAnimation, CreatingWalletAnimation, SuccessAnimation } from './components/BiometricAnimation';
import { BalanceCard, QuickActions, TransactionList } from './components/DashboardComponents';
import WalletConnect from './components/WalletConnect';
import TransactionForm from './components/TransactionForm';

function AppContent() {
  const { isConnected, wallet } = useWallet();
  const [isTransactionMode, setIsTransactionMode] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<'intro' | 'auth' | 'creating' | 'success' | 'dashboard'>('intro');

  useEffect(() => {
    if (!isConnected && onboardingStep !== 'intro') {
      setIsTransactionMode(false);
      setOnboardingStep('intro');
    }
  }, [isConnected, onboardingStep]);

  // Handler para iniciar o processo de criação da carteira
  const handleWalletCreated = () => {
    setOnboardingStep('creating');
    // Simular tempo de criação
    setTimeout(() => {
      setOnboardingStep('success');
      setTimeout(() => {
        setOnboardingStep('dashboard');
      }, 2000);
    }, 3000);
  };

  const handleSend = () => {
    setIsTransactionMode(true);
  };

  const handleReceive = () => {
    alert('Funcionalidade de recebimento em desenvolvimento');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* === HEADER === */}
      <header className="glass sticky top-0 z-50 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 glass-hover rounded-2xl flex items-center justify-center shadow-glow">
                <span className="text-2xl">💜</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  PassPay
                </h1>
                <p className="text-purple-300 text-sm">Gasless USDC • Biometric Auth</p>
              </div>
            </div>

            {isConnected && onboardingStep === 'dashboard' && wallet && (
              <div className="glass-hover p-3 rounded-2xl text-xs flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">✅</span>
                </div>
                <code className="font-mono truncate max-w-[180px] text-green-400">
                  {`${wallet.smartWallet?.slice(0,6)}...${wallet.smartWallet?.slice(-4)}`}
                </code>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* === MAIN CONTENT === */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* === ANIMAÇÕES DE ONBOARDING === */}
        {onboardingStep === 'auth' && (
          <BiometricAnimation />
        )}

        {onboardingStep === 'creating' && (
          <CreatingWalletAnimation />
        )}

        {onboardingStep === 'success' && (
          <SuccessAnimation />
        )}

        {/* === DASHBOARD PRINCIPAL === */}
        {onboardingStep === 'dashboard' && isConnected && wallet && (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Balance & Quick Actions */}
            <div className="space-y-8">
              <BalanceCard
                balance={wallet.balance?.usdc || '0.00'}
                address={wallet.smartWallet}
                network="Devnet"
              />

              <QuickActions
                onSend={handleSend}
                onReceive={handleReceive}
              />
            </div>

            {/* Right Column - Transaction History & Actions */}
            <div className="space-y-8">
              <TransactionList transactions={wallet.transactions || []} />

              {/* Transaction Form Modal */}
              {isTransactionMode && (
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Enviar USDC</h3>
                    <button
                      onClick={() => setIsTransactionMode(false)}
                      className="text-gray-400 hover:text-white transition"
                    >
                      ✕
                    </button>
                  </div>
                  <TransactionForm
                    senderAddress={wallet.smartWallet}
                    onSuccess={() => setIsTransactionMode(false)}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* === TELA INICIAL (INTRO) === */}
        {onboardingStep === 'intro' && !isConnected && (
          <div className="text-center">
            {/* Hero Section */}
            <div className="glass-hover max-w-4xl mx-auto p-12 rounded-3xl mb-12 animate-float">
              <div className="w-32 h-32 glass bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-glow animate-pulse-slow">
                <span className="text-6xl">🔐</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold gradient-text mb-6 animate-pulse">
                Biometria Pura
              </h1>
              <p className="text-xl text-purple-200 leading-relaxed max-w-2xl mx-auto mb-8">
                Autenticação nativa com digital ou FaceID. Sem seed phrases.
                Transações USDC completamente gasless na blockchain Solana.
              </p>

              <div className="flex justify-center">
                <WalletConnect onSuccess={handleWalletCreated} />
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="glass-hover p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👆</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Biometria Nativa</h3>
                <p className="text-purple-300">Autenticação segura com TouchID, FaceID ou PIN</p>
              </div>

              <div className="glass-hover p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-cyan-600/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Transações Gasless</h3>
                <p className="text-purple-300">Envie USDC sem precisar de SOL na carteira</p>
              </div>

              <div className="glass-hover p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">100% Seguro</h3>
                <p className="text-purple-300">WebAuthn padrão W3C com criptografia de ponta</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* === FOOTER === */}
      <footer className="glass border-t border-purple-500/20 mt-32">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-purple-300 text-sm mb-6">
            <p>LazorKit Bounty Demo • WebAuthn Real • Janeiro 2026</p>
            <a href="https://github.com/lazor-kit" className="glass-hover px-4 py-2 rounded-xl font-medium hover:text-white transition">GitHub</a>
          </div>
          <p className="text-xs text-purple-500/70">Superteam Earn Submission • Pré-audit Demo</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LazorkitProvider>
      <AppContent />
    </LazorkitProvider>
  );
}
