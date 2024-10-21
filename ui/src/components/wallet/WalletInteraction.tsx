import { useAtom } from "jotai";
import { cardStateAtom, isOverlayVisibleAtom } from "@/state/walletAtoms";
import { ConnectWallet } from "./ConnectWallet";
import { SubmitContribution } from "./SubmitContribution";
import { WaitingApproval } from "./WaitingApproval";

export default function WalletInteraction() {
  const [cardState, setCardState] = useAtom(cardStateAtom);
  const [isOverlayVisible, setOverlayVisible] = useAtom(isOverlayVisibleAtom);

  const handleClose = () => {
    setCardState("none");
    setOverlayVisible(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 ${
          isOverlayVisible ? 'flex' : 'hidden'
        } items-center justify-center z-50 bg-black bg-opacity-40`}
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
          className="relative z-50"
        >
          {/* Wallet cards based on state */}
          {cardState === "connect" && <ConnectWallet />}
          {cardState === "submit" && <SubmitContribution />}
          {cardState === "approval" && <WaitingApproval />}
        </div>
      </div>
    </>
  );
}
