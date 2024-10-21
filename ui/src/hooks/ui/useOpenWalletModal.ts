import { useAtom } from "jotai";
import { cardStateAtom, isOverlayVisibleAtom } from "@/state/walletAtoms";

// Define a utility hook to open the wallet modal
export const useOpenWalletModal = () => {
  const [, setCardState] = useAtom(cardStateAtom);
  const [, setOverlayVisible] = useAtom(isOverlayVisibleAtom);

  const openWalletModal = () => {
    setCardState("connect"); // Set the desired card state
    setOverlayVisible(true); // Show the overlay
  };

  return openWalletModal;
};
