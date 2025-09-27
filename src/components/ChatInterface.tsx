import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Settings, Minimize2 } from "lucide-react";

interface ChatInterfaceProps {
  className?: string;
  variant?: "default" | "compact";
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  className = "", 
  variant = "default" 
}) => {
  const messages = [
    {
      type: "bot",
      message: "Hi! I'm your campus AI assistant. I can help you with schedules, courses, and academic questions in multiple languages. What would you like to know?",
      time: "Just now"
    },
    {
      type: "user", 
      message: "What time is my Chemistry lab tomorrow?",
      time: "2 min ago"
    },
    {
      type: "bot",
      message: "Your Chemistry lab (CHEM 201) is scheduled for tomorrow at 2:00 PM in Room SC-205. Don't forget to bring your lab notebook!",
      time: "1 min ago"
    }
  ];

  return (
    <Card className={`bg-white shadow-chatbot border-0 ${className}`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Campus Assistant</h3>
            <p className="text-xs text-muted-foreground">Ready to help with schedules</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-6 h-6">
            <Settings className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6">
            <Minimize2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-4 space-y-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-8 h-8">
                {msg.type === "bot" ? (
                  <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <AvatarFallback className="bg-secondary text-xs">U</AvatarFallback>
                )}
              </Avatar>
              <div className={`space-y-1 ${msg.type === "user" ? "text-right" : ""}`}>
                <div className={`inline-block p-3 rounded-lg text-sm ${
                  msg.type === "user" 
                    ? "bg-gradient-primary text-white" 
                    : "bg-secondary text-foreground"
                }`}>
                  {msg.message}
                </div>
                <p className="text-xs text-muted-foreground">{msg.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <div className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-muted-foreground">
            Ask about your classes...
          </div>
          <Button variant="gradient" size="sm">
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};