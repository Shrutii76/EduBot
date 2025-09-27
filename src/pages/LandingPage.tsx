import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CollegeLogo } from "@/components/CollegeLogo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LoginDialog } from "@/components/LoginDialog";
import { ChatWidget } from "@/components/ChatWidget";
import { MessageCircle, Shield, Globe, Zap, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatInterface } from "@/components/ChatInterface";
import { 
  HeadphonesIcon,
  ShoppingCart,
  Calendar,
  Menu,
  X,
  Star,
  Play
} from "lucide-react";

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
      <section className="container px-4 pt-6 pb-16 lg:pt-8 lg:pb-24 bg-white/80 backdrop-blur-sm">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="gradient-primary font-medium">Your Campus AI Assistant</p>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Smart Campus Support:</span>
                <br />
                <span className="bg-gradient-primary text-blue-900 bg-clip-text text-transparent">
                  Your Academic AI Companion
                </span>
              </h1>
              <p className=" text-lg text-muted-foreground max-w-lg">
                Get instant answers about your college schedule, courses, and campus life in your preferred language. 
                From class timings to registration deadlines, our AI assistant helps international and local students 
                navigate academic life effortlessly - available 24/7 in 50+ languages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="lg" onClick={() => setShowLogin(true)}>
                Check My Schedule
              </Button>
                <Button onClick={() => setShowWidget(!showWidget)} variant="campus-outline" size="lg">
                  {showWidget ? "Hide" : "Show"} Chat Widget
                </Button>
            </div>
            {/* Stats */}
            {/* <div className="flex gap-8 pt-8">
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">10,000+</div>
                <div className="text-sm text-muted-foreground">Students Helped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </div> */}
          </div>

          

          {/* Chat Interface Mockup */}
          <div className="relative">
            <ChatInterface className="transform rotate-2 hover:rotate-0 transition-transform duration-500" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-primary rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full opacity-30 blur-2xl"></div>
          </div>
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
        <Card className="bg-gradient-primary text-white shadow-chatbot border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Simplify Your College Life?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students already using our campus AI assistant to stay organized, 
              informed, and never miss important academic deadlines again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
              
                onClick={() => setShowLogin(true)}
              >
                Start Chatting Now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                See Demo
              </Button>
            </div>
          </CardContent>
        </Card>
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