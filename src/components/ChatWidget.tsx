import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenFull: () => void;
  userName: string;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatWidget({ isOpen, onToggle, onOpenFull, userName }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hi ${userName}! I'm your Campus Assistant. How can I help you today?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're asking about that. Let me help you find the right information.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Widget Button */}
      {!isOpen && (
        <Button
          onClick={onToggle}
          variant="widget"
          size="icon"
          className="h-14 w-14 animate-pulse-glow"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Mini Chat Window */}
      {isOpen && (
        <Card className="w-80 h-96 shadow-chatbot animate-slide-up bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-campus text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-white/20 text-white text-xs">
                  CA
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">Campus Assistant</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                onClick={onOpenFull}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                onClick={onToggle}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-2 text-sm ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-4"
                        : "bg-muted text-muted-foreground mr-4"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon" variant="campus">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}