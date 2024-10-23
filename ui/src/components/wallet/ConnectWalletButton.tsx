"use client";

import { useAtom } from "jotai";
import { cardStateAtom, isOverlayVisibleAtom, isWalletConnectedAtom } from "@/state/walletAtoms";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { Button } from "@/registry/new-york/ui/button";
import { useEffect } from "react";

export default function CustomButton({ children }: { children?: React.ReactNode }) {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const [, setIsWalletConnected] = useAtom(isWalletConnectedAtom);
  const [cardState, setCardState] = useAtom(cardStateAtom);
  const [, setOverlayVisible] = useAtom(isOverlayVisibleAtom);

  const handleLogin = () => {
    console.log("Attempting to connect wallet...");
    open();
  };

  const handleWalletConnected = () => {
    console.log("Wallet connected. Setting state to 'submit'.");
    setIsWalletConnected(true);
    setCardState("submit");
    setOverlayVisible(true);
  };

  useEffect(() => {
    console.log("isConnected:", isConnected);
    console.log("cardState:", cardState);
    
    if (isConnected && cardState !== "submit") {
      console.log("Setting card to 'submit'");
      setCardState("submit");
      setIsWalletConnected(true);
      setOverlayVisible(true);
    }
  }, [isConnected, cardState, setCardState, setIsWalletConnected, setOverlayVisible]);

  return (
    <Button
      type="button"
      onClick={handleLogin}
      variant="default"
      className="flex items-center"
    >
      {children || (
        <>
          <span className="mr-2 text-xl">👛</span>
          Connect Wallet
        </>
      )}
    </Button>
  );
}
