import { useLocation } from "react-router-dom";
import { Mail, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function EmailViewer() {
  const location = useLocation();
  const email = location.state?.email;
  if (!email) return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Email not found</div>;
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4 p-4 bg-card rounded-t-lg shadow-md">
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-card-foreground">{email.subject}</h1>
          </div>
          <Button variant="outline" size="sm" className="border-border"><Download className="h-4 w-4 mr-1" />Download</Button>
        </div>
        <div className="p-6 bg-card rounded-b-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">From: {email.from}</p>
              <p className="text-xs text-muted-foreground">{email.time}</p>
            </div>
            <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer" />
          </div>
          <hr className="border-muted mb-4"/>
          <div className="text-sm text-foreground whitespace-pre-wrap">{email.body}</div>
        </div>
      </div>
    </div>
  );
}
