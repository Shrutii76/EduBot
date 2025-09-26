import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CollegeLogo } from "@/components/CollegeLogo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LoginDialog } from "@/components/LoginDialog";
import { ChatWidget } from "@/components/ChatWidget";
import { MessageCircle, Shield, Globe, Zap, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  type: 'student' | 'admin';
}

export default function LandingPage() {
  const [language, setLanguage] = useState("en");
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showWidget, setShowWidget] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleOpenChat = () => {
    navigate("/chat");
  };

  const features = [
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "Get instant answers to campus questions anytime"
    },
    {
      icon: Globe,
      title: "Multilingual",
      description: "Chat in your preferred language"
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description: "AI-powered quick and accurate answers"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are protected"
    },
    {
      icon: Users,
      title: "Student-Focused",
      description: "Designed specifically for campus life"
    },
    {
      icon: BookOpen,
      title: "Academic Support",
      description: "Course info, schedules, and resources"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <CollegeLogo />
            <div className="flex items-center gap-4">
              <LanguageSelector value={language} onChange={setLanguage} />
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Hi, {user.name.split(' ')[0]}! 👋</span>
                  <Button onClick={() => navigate("/dashboard")} variant="campus-outline" size="sm">
                    Dashboard
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button onClick={() => setShowLogin(true)} variant="campus">
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-campus bg-clip-text text-transparent">
              Campus Help Assistant
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your intelligent campus companion. Get instant answers about courses, events, 
              facilities, and everything you need to know about campus life.
            </p>
          </div>

          {user ? (
            <div className="space-y-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-white/30 shadow-card">
                <h2 className="text-2xl font-semibold mb-2">Welcome back, {user.name}!</h2>
                <p className="text-muted-foreground mb-4">
                  Ready to continue where you left off? Click the chat widget below or open the full chat experience.
                </p>
                <Button onClick={handleOpenChat} variant="campus" size="lg" className="mr-4">
                  Open Chat Assistant
                </Button>
                <Button onClick={() => setShowWidget(!showWidget)} variant="campus-outline" size="lg">
                  {showWidget ? "Hide" : "Show"} Chat Widget
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-white/30 shadow-card">
                <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
                <p className="text-muted-foreground mb-6">
                  Login with your student credentials to access personalized assistance, 
                  or continue as a guest for general campus information.
                </p>
                <Button onClick={() => setShowLogin(true)} variant="campus" size="lg">
                  Start Chatting
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Campus Assistant?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-white/30 shadow-card hover:shadow-chatbot transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-campus rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-gradient-campus text-white shadow-chatbot">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-white/90">
                Join thousands of students already using Campus Assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowLogin(true)} 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Login Dialog */}
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onLogin={handleLogin}
      />

      {/* Chat Widget (only show if user is logged in) */}
      {user && (
        <ChatWidget
          isOpen={showWidget}
          onToggle={() => setShowWidget(!showWidget)}
          onOpenFull={handleOpenChat}
          userName={user.name.split(' ')[0]}
        />
      )}
    </div>
  );
}