import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const useWallet = () => {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  return {
    address,
    isConnected,
    connect,
    disconnect,
    connectors,
    error,
    isLoading,
    pendingConnector,
  };
};
