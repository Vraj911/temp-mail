import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (API call or alert)
    alert(`Thank you, ${name}! Your message has been received.`);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full bg-card rounded-lg shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground text-center">Contact Us</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 rounded-lg border border-muted-foreground bg-background text-foreground"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-muted-foreground bg-background text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Message"
            className="w-full px-4 py-2 rounded-lg border border-muted-foreground bg-background text-foreground"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
