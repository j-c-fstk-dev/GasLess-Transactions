// src/components/WalletConnect.tsx - SIMPLIFICADO
import { useState } from 'react';
import { useWallet } from '../mocks/lazorKitMock';

interface WalletConnectProps {
  onSuccess?: () => void;
}

export default function WalletConnect({ onSuccess }: WalletConnectProps) {
  const { disconnect, isConnected } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    console.log('🔵 WalletConnect: Botão clicado, chamando onSuccess()');
    setError(null);
    
    // Apenas chama o callback - App.tsx cuida do resto
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleDisconnect = async () => {
    setError(null);
    try {
      await disconnect();
    } catch (err) {
      setError('Falha ao desconectar.');
    }
  };

  // Se já está conectado, mostra opção de desconectar
  if (isConnected) {
    return (
      <div className="space-y-6">
        <div className="card bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-500/30 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-glow-green animate-pulse">
            <span className="text-5xl">✅</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">PassPay Ativo</h2>
          <p className="text-green-100 text-lg mb-6">Autenticação biométrica confirmada</p>
          <div className="badge-success mx-auto">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Carteira conectada
          </div>
        </div>

        <button
          onClick={handleDisconnect}
          className="btn-secondary w-full"
        >
          Desconectar Carteira
        </button>
      </div>
    );
  }

  // Tela inicial - apenas o botão
  return (
    <div className="space-y-6">
      {/* CTA Button */}
      <button
        onClick={handleConnect}
        className="btn-primary w-full max-w-md mx-auto group"
      >
        <span className="mr-3 text-2xl group-hover:scale-125 inline-block transition-transform">👆</span>
        Conectar com Digital/FaceID
      </button>

      {/* Error message */}
      {error && (
        <div className="glass border-2 border-red-500/50 p-6 rounded-2xl animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <p className="text-red-300 font-semibold mb-1">Erro na conexão</p>
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}