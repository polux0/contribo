import { useEffect } from "react";
import { useAtom } from "jotai";
import { isApprovedAtom, isClaimingAtom, cardStateAtom, walletStateAtom } from "@/state/walletAtoms";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/providers/ToastProviderWrapper";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";

export const WaitingApproval = () => {
  const [isApproved, setIsApproved] = useAtom(isApprovedAtom);
  const [isClaiming, setIsClaiming] = useAtom(isClaimingAtom);
  const [, setCardState] = useAtom(cardStateAtom); // Manage card state after claiming rewards
  const [, setWalletState] = useAtom(walletStateAtom); // Manage wallet state
  const { addToast } = useToast(); // Trigger toast notifications

  // Simulate approval after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsApproved(true); // Change status to Approved after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [setIsApproved]);

  const handleClaimRewards = () => {
    setIsClaiming(true);

    // Simulate rewards and reputation claiming
    setTimeout(() => {
      // First, display "Rewards claimed" toast
      addToast({
        title: "Rewards claimed",
        description: "Your reward of $250 USD has been successfully claimed.",
        duration: 4000, // Show for 4 seconds
      });

      // After a delay, display the "Reputation claimed" toast
      setTimeout(() => {
        addToast({
          title: "Reputation claimed",
          description: "Your reputation has been successfully claimed.",
          duration: 4000,
        });

        // Reset the state after the toasts are displayed
        setTimeout(() => {
          setIsClaiming(false);
          setCardState("connect"); // Reset to "Connect Wallet"
          setWalletState({ isConnected: false, isConnecting: false }); // Reset wallet state
        }, 2000); // Delay before resetting the wallet state to "connect"
      }, 100); // Small delay to ensure toasts appear in sequence
    }, 2000); // Delay to simulate the rewards claiming process
  };

  return (
    <div className="flex items-center justify-center min-h-screen"> {/* Centering div */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Waiting for Approval</CardTitle>
          <CardDescription>
            As soon as verifier approves your work, you'll be able to claim rewards & reputation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {isApproved ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <span className={`text-sm font-medium ${isApproved ? 'text-green-500' : 'text-yellow-500'}`}>
                Status: {isApproved ? "Approved" : "Waiting for approval"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleClaimRewards} disabled={!isApproved || isClaiming} className="w-full">
            {isClaiming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Claiming...
              </>
            ) : (
              "Claim Rewards & Reputation"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
