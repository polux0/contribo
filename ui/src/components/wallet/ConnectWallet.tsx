import { useAtom } from "jotai";
import { walletStateAtom, cardStateAtom } from "@/state/walletAtoms"; // Import the atoms
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";

export const ConnectWallet = () => {
  const [walletState, setWalletState] = useAtom(walletStateAtom); // Use atom for wallet state
  const [, setCardState] = useAtom(cardStateAtom); // Use atom for managing card state

  const handleConnect = () => {
    setWalletState({ ...walletState, isConnecting: true });
    setTimeout(() => {
      setWalletState({ isConnected: true, isConnecting: false });
      setCardState("submit"); // Move to submit state after connecting
    }, 2000);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>
          Connect your wallet in order to be able to interact with the system
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleConnect} disabled={walletState.isConnecting} className="w-full">
          {walletState.isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : walletState.isConnected ? (
            "Connected"
          ) : (
            "Connect Wallet"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
