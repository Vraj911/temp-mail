import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Settings, Shield, Zap, Inbox, User } from "lucide-react";
export default function Landing() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-6 py-16 text-center max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <Mail className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to RapidMail</h1>
          <p className="text-muted-foreground text-lg">
            Generate temporary emails instantly. Stay private, secure, and in control of your inbox.
          </p>
          <Button
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3 text-lg"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
<div className="space-y-6 text-left">
  <h2 className="text-3xl font-bold text-center mb-6">How it Works</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[{
      icon: Inbox,
      title: "Step 1: Generate",
      desc: "Quickly generate a temporary email address with one click."
    },{
      icon: Shield,
      title: "Step 2: Protect",
      desc: "Keep your inbox private and protect against spam and phishing."
    },{
      icon: Zap,
      title: "Step 3: Control",
      desc: "Manage, delete, and monitor your temporary emails easily."
    }].map((item, idx) => (
      <div
        key={idx}
        className="p-6 bg-card rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center"
      >
        <item.icon className="h-10 w-10 mx-auto text-primary mb-3" />
        <h3 className="font-semibold text-card-foreground mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.desc}</p>
      </div>
    ))}
  </div>
</div>
<div className="space-y-6 text-left">
  <h2 className="text-3xl font-bold text-center mb-6">Features</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[{
      icon: User,
      title: "User Friendly",
      desc: "Easy to use interface with minimal steps to generate emails."
    },{
      icon: Settings,
      title: "Customizable",
      desc: "Configure settings and email options according to your needs."
    },{
      icon: Mail,
      title: "Instant Delivery",
      desc: "Emails are received instantly, allowing quick verification or testing."
    }].map((item, idx) => (
      <div
        key={idx}
        className="p-6 bg-card rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center"
      >
        <item.icon className="h-10 w-10 mx-auto text-primary mb-3" />
        <h3 className="font-semibold text-card-foreground mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.desc}</p>
      </div>
    ))}
  </div>
</div>
       <div className="space-y-6 text-left">
  <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
  <div className="flex flex-col md:flex-row justify-center gap-4">
    <Button
      className="bg-secondary hover:bg-primary-hover text-primary-foreground px-6 py-3"
      onClick={() => navigate("/contact")}> Contact Us</Button>
    <Button
      className="bg-secondary hover:bg-primary-hover text-primary-foreground px-6 py-3"
      onClick={() => navigate("/feedback")}
    >
      Feedback
    </Button>
  </div>
</div>
      </div>
    </div>
  );
}
