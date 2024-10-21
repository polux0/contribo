import { useState } from "react";
import { Clipboard, Check, Share2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CopyUrlCard = ({ onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setIsCopied(true))
      .catch((err) => console.error('Failed to copy URL:', err));
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Share This Page</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-2">
          <span className="text-sm">Copy the URL to share:</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={handleCopyUrl} variant="outline" size="sm" className="flex items-center space-x-2">
          {isCopied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Clipboard className="w-4 h-4" />
              <span>Copy URL</span>
            </>
          )}
        </Button>
        <Button onClick={onClose} variant="ghost" size="sm">Close</Button>
      </CardFooter>
    </Card>
  );
};
