import { X } from "lucide-react"; // Import an 'X' icon for closing
import { useAtom } from "jotai";
import { walletStateAtom, cardStateAtom, isOverlayVisibleAtom } from "@/state/walletAtoms"; // Import the atoms
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export const ConnectWallet = () => {
  const [walletState, setWalletState] = useAtom(walletStateAtom); // Use atom for wallet state
  const [, setCardState] = useAtom(cardStateAtom); // Use atom for managing card state
  const [, setOverlayVisible] = useAtom(isOverlayVisibleAtom);

  const handleConnect = () => {
    setWalletState({ ...walletState, isConnecting: true });
    setTimeout(() => {
      setWalletState({ isConnected: true, isConnecting: false });
      setCardState("submit"); // Move to submit state after connecting
    }, 2000);
  };

  // Close function: reset card state to hide the card (or return to previous state)
  const handleClose = () => {
    setCardState("none");
    setOverlayVisible(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen fixed inset-0 z-50">
      <Card className="w-[350px] relative shadow-lg">
        <CardHeader className="flex flex-col items-center p-4">
          {/* Close button */}
          <Button 
            onClick={handleClose} 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2"
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription className="text-center mt-2">
            Connect your wallet in order to be able to interact with the system.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-center p-4">
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
    </div>
  );
};
