import { useState, useEffect } from "react";
import { Copy, QrCode, Timer, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
interface EmailCardProps {
  email: string;
  expiresIn: number; 
  onCopy?: () => void;
}
export function EmailCard({ email, expiresIn, onCopy }: EmailCardProps) {
  const [timeLeft, setTimeLeft] = useState(expiresIn * 60); 
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      onCopy?.();
      toast({
        title: "Email copied",
        description: "The email address has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy email to clipboard.",
        variant: "destructive",
      });
    }
  };
  return (
    <Card className="p-4 bg-card border-border shadow-custom-md hover:shadow-custom-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-card-foreground mb-1">Email:</p>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Timer className="h-3 w-3" />
          <span className={cn(
            "font-mono",
            timeLeft < 300 ? "text-destructive" : "text-muted-foreground"
          )}>
            Expires in {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex-1 text-xs"
          disabled={copied}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="px-2"
        >
          <QrCode className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}