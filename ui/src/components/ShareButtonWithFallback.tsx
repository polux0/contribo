import { useState } from "react";
import { Share2 } from "lucide-react";
import { CopyUrlCard } from "@/components/ui/CopyUrlCard";
import { Button } from "@/components/ui/button";

export const ShareButtonWithFallback = () => {
  const [showCopyUrlCard, setShowCopyUrlCard] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    // Check if the browser supports the Web Share API
    if (navigator.share) {
      navigator
        .share({
          title: "Check this out!",
          text: "Take a look at this page.",
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      // If Web Share API is not supported, show the Copy URL card
      setShowCopyUrlCard(true);
    }
  };

  return (
    <div className="relative">
      <Button
        type="button"
        className="p-2"
        onClick={handleShare}
        variant="ghost"
      >
        <Share2 className="w-5 h-5" />
      </Button>

      {/* Display the Copy URL card as a fallback */}
      {showCopyUrlCard && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
          onClick={() => setShowCopyUrlCard(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CopyUrlCard onClose={() => setShowCopyUrlCard(false)} />
          </div>
        </div>
      )}
    </div>
  );
};