import { useAtom } from "jotai";
import { cardStateAtom } from "@/state/walletAtoms";
import { ConnectWallet } from "./ConnectWallet";
import { SubmitContribution } from "./SubmitContribution";
import { WaitingApproval } from "./WaitingApproval";

export default function WalletInteraction() {
  const [cardState] = useAtom(cardStateAtom); // Determine which card to show

  return (
    <div className="w-[350px]">
      {cardState === "connect" && <ConnectWallet />}
      {cardState === "submit" && <SubmitContribution />}
      {cardState === "approval" && <WaitingApproval />}
    </div>
  );
}
