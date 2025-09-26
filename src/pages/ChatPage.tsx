import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CollegeLogo } from "@/components/CollegeLogo";
import { LanguageSelector } from "@/components/LanguageSelector";
import {
  Send,
  Phone,
  Mail,
  User,
  MessageCircle,
  Clock,
  Book,
  Calendar,
  Users,
  HelpCircle,
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Speech API types ---
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  language?: string;
}

interface FAQ {
  id: string;
  question: string;
  category: string;
  icon: any;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Campus Assistant. I can help you with courses, schedules, facilities, events, and much more. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      language: "en",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const navigate = useNavigate();

  const quickFAQs: FAQ[] = [
    { id: "1", question: "Library hours", category: "Facilities", icon: Clock },
    { id: "2", question: "Course registration", category: "Academic", icon: Book },
    { id: "3", question: "Upcoming events", category: "Events", icon: Calendar },
    { id: "4", question: "Student services", category: "Support", icon: Users },
    { id: "5", question: "Dining hours", category: "Facilities", icon: Clock },
  ];

  const popularFAQs = [
    "How do I register for courses?",
    "What are the library hours?",
    "Where is the student center?",
    "How do I contact academic advisors?",
    "What dining options are available?",
    "How do I access WiFi on campus?",
  ];

  // --- Scroll to bottom when messages update ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Init Speech Recognition ---
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === "es" ? "es-ES" : "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => setIsRecording(false);
      recognitionRef.current.onend = () => setIsRecording(false);
    }

    return () => {
      recognitionRef.current?.stop();
      if (speechSynthRef.current) speechSynthesis.cancel();
    };
  }, [language]);

  // --- Send message ---
  const sendMessage = (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulated bot response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "I found some information for you.",
        "Here’s what you need to know.",
        "Check this out, it might help.",
      ];
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot",
        timestamp: new Date(),
        language,
      };
      setMessages((prev) => [...prev, botResponse]);

      if (speechEnabled && "speechSynthesis" in window) {
        speakText(botResponse.content, language);
      }
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickFAQ = (q: string) => sendMessage(q);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };
  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const speakText = (text: string, lang: string) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "es" ? "es-ES" : "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setSpeechEnabled(!speechEnabled);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="icon"
              className="hover:bg-white/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CollegeLogo size="sm" />
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector value={language} onChange={setLanguage} />
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              size="icon"
              className="hover:bg-white/50"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-white/60 backdrop-blur-sm border-r border-white/20 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Quick Help */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Quick Help
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickFAQs.map((faq) => (
                  <Button
                    key={faq.id}
                    onClick={() => handleQuickFAQ(faq.question)}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto p-3 bg-white/50 hover:bg-white/70"
                  >
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 mb-1">
                        <faq.icon className="h-4 w-4" />
                        <Badge variant="secondary" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                      <span className="text-xs text-left">{faq.question}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Popular Questions */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Popular Questions</h3>
              <div className="space-y-2">
                {popularFAQs.map((q, i) => (
                  <Button
                    key={i}
                    onClick={() => handleQuickFAQ(q)}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-left h-auto p-3 hover:bg-white/50 w-full"
                  >
                    <HelpCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{q}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Support */}
            <Card className="bg-gradient-campus text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" /> Call Support
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" /> Email Staff
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-4 ${
                    m.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback
                      className={
                        m.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-gradient-campus text-white"
                      }
                    >
                      {m.sender === "user" ? "U" : "CA"}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 ${m.sender === "user" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block max-w-[80%] rounded-lg p-4 shadow-card ${
                        m.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-white text-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{m.content}</p>
                      {m.language && m.sender === "bot" && (
                        <div className="flex items-center gap-1 mt-2 opacity-70">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="text-xs">{m.language.toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {m.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Bar */}
          <div className="border-t border-white/20 bg-white/60 backdrop-blur-sm p-6">
            <div className="max-w-4xl mx-auto">
              {/* Quick buttons */}
              <div className="flex gap-4 mb-4">
                <Button
                  onClick={() => handleQuickFAQ("What are the library hours?")}
                  variant="outline"
                  size="sm"
                  className="bg-white/50 hover:bg-white/70"
                >
                  Library Hours
                </Button>
                <Button
                  onClick={() => handleQuickFAQ("How do I register for courses?")}
                  variant="outline"
                  size="sm"
                  className="bg-white/50 hover:bg-white/70"
                >
                  Course Registration
                </Button>
                <Button
                  onClick={() => handleQuickFAQ("Where is the dining hall?")}
                  variant="outline"
                  size="sm"
                  className="bg-white/50 hover:bg-white/70"
                >
                  Dining Information
                </Button>
              </div>

              {/* Input row */}
              <div className="flex gap-3">
                <Input
                  placeholder="Type your question here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 bg-white/70 border-white/30"
                />
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  variant={isRecording ? "destructive" : "outline"}
                  size="icon"
                  className={`bg-white/70 border-white/30 ${
                    isRecording ? "animate-pulse" : ""
                  }`}
                  disabled={
                    !(
                      "webkitSpeechRecognition" in window ||
                      "SpeechRecognition" in window
                    )
                  }
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={toggleSpeech}
                  variant="outline"
                  size="icon"
                  className="bg-white/70 border-white/30"
                  disabled={!("speechSynthesis" in window)}
                >
                  {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button onClick={() => sendMessage()} variant="campus" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Campus Assistant • Your conversations are private and secure •{" "}
            <Button variant="link" size="sm" className="p-0 h-auto text-xs">
              Privacy Policy
            </Button>
          </p>
        </div>
      </footer>
    </div>
  );
}
