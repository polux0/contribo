import { useAtom } from "jotai";
import { walletStateAtom, proofUrlAtom, cardStateAtom } from "@/state/walletAtoms"; // Import the necessary atoms
import { Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardFooter, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";

export const SubmitContribution = () => {
  const [walletState] = useAtom(walletStateAtom); // Access the wallet state atom
  const [proofUrl, setProofUrl] = useAtom(proofUrlAtom); // Access and update the proof URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setCardState] = useAtom(cardStateAtom); // Use this to transition to the next card

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCardState("approval"); // Move to the waiting approval state after submission
    }, 2000);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Submit Contribution</CardTitle>
        <CardDescription>
          Submit your contribution so we can let the verifier know that your work needs to be verified in order to claim rewards & reputation.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contributor Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Contributor Name</div>
              <div className="text-sm text-gray-500">{walletState.address || '0x9876...4321'}</div>
            </div>
          </div>
          <Badge variant="secondary">Owner</Badge>
        </div>

        {/* Verifier Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Verifier Name</div>
              <div className="text-sm text-gray-500">0xabcd...ef01</div>
            </div>
          </div>
          <Badge variant="secondary">Verifier</Badge>
        </div>

        {/* Status and Contribution Type */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-500">Status: In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Type:</span>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">#back-end</Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">#devops</Badge>
          </div>
        </div>

        {/* Proof of Contribution */}
        <div>
          <Label htmlFor="proof">Proof of contribution</Label>
          <Input id="proof" placeholder="Enter URL" value={proofUrl} onChange={(e) => setProofUrl(e.target.value)} />
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleSubmit} disabled={!proofUrl || isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};