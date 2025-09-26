import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollegeLogo } from "@/components/CollegeLogo";
import { ArrowRight, ArrowDown, LogIn, MessageCircle, BarChart3, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FlowDiagram() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="icon"
              className="hover:bg-white/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CollegeLogo />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-campus bg-clip-text text-transparent">
            Campus Chatbot Flow Diagram
          </h1>
        </div>

        {/* Flow Diagram */}
        <div className="space-y-8">
          {/* Step 1: Landing Page */}
          <div className="text-center">
            <Card className="inline-block bg-white/80 backdrop-blur-sm shadow-card hover:shadow-chatbot transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-primary">1. Landing Page (Public View)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-gradient-subtle p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-campus rounded"></div>
                      <span className="font-medium">Campus University</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🇺🇸 English</span>
                      <Button size="sm" variant="campus">Login</Button>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Campus Help Assistant</h2>
                  <p className="text-sm text-muted-foreground">
                    Your intelligent campus companion for instant answers
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  ✓ Clean header with logo & language selector<br/>
                  ✓ Introduction about chatbot<br/>
                  ✓ Prominent Login button
                </div>
              </CardContent>
            </Card>
            
            <div className="my-6">
              <ArrowDown className="h-8 w-8 text-primary mx-auto animate-float" />
              <span className="text-sm font-medium text-primary">Click Login</span>
            </div>
          </div>

          {/* Step 2: Login Popup */}
          <div className="text-center">
            <Card className="inline-block bg-white/80 backdrop-blur-sm shadow-card hover:shadow-chatbot transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-primary">2. Login Popup (Overlay)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white p-4 rounded-lg border shadow-sm max-w-sm mx-auto">
                  <h3 className="font-semibold mb-3 bg-gradient-campus bg-clip-text text-transparent">
                    Campus Login
                  </h3>
                  <div className="space-y-2 text-left text-xs">
                    <div className="border rounded p-2">Student ID / Email</div>
                    <div className="border rounded p-2">Password or OTP</div>
                    <Button size="sm" variant="campus" className="w-full">Login as Student</Button>
                    <Button size="sm" variant="outline" className="w-full">Continue as Guest</Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  ✓ Student ID/Email + Password/OTP fields<br/>
                  ✓ Guest Access option<br/>
                  ✓ Overlay design
                </div>
              </CardContent>
            </Card>
            
            <div className="my-6">
              <ArrowDown className="h-8 w-8 text-primary mx-auto animate-float" />
              <span className="text-sm font-medium text-primary">After Authentication</span>
            </div>
          </div>

          {/* Step 3: Landing Page with Widget */}
          <div className="text-center">
            <Card className="inline-block bg-white/80 backdrop-blur-sm shadow-card hover:shadow-chatbot transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-primary">3. Landing Page with Chatbot Widget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-gradient-subtle p-4 rounded-lg border relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-campus rounded"></div>
                      <span className="font-medium">Campus University</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Hi, Shrutika! 👋</span>
                      <Button size="sm" variant="campus-outline">Dashboard</Button>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Welcome back, Shrutika!</h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ready to continue where you left off?
                  </p>
                  {/* Chat Widget */}
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-gradient-campus text-white p-3 rounded-full shadow-widget">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  ✓ Personalized greeting<br/>
                  ✓ Small chat widget at bottom-right<br/>
                  ✓ Same landing page layout
                </div>
              </CardContent>
            </Card>
            
            <div className="my-6">
              <ArrowDown className="h-8 w-8 text-primary mx-auto animate-float" />
              <span className="text-sm font-medium text-primary">Click Widget or Open Full Chat</span>
            </div>
          </div>

          {/* Step 4: Full Chat Page */}
          <div className="text-center">
            <Card className="inline-block bg-white/80 backdrop-blur-sm shadow-card hover:shadow-chatbot transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-primary">4. Chatbot Page (Full Experience)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white border rounded-lg p-3 max-w-2xl mx-auto">
                  <div className="flex text-xs">
                    {/* Sidebar */}
                    <div className="w-20 bg-gray-50 p-2 rounded-l space-y-1">
                      <div className="text-xs font-medium">Quick Help</div>
                      <div className="bg-white p-1 rounded text-[10px]">Library</div>
                      <div className="bg-white p-1 rounded text-[10px]">Courses</div>
                      <div className="bg-campus-blue text-white p-1 rounded text-[10px]">Contact</div>
                    </div>
                    {/* Chat Area */}
                    <div className="flex-1 p-2">
                      <div className="space-y-2">
                        <div className="bg-gray-100 p-2 rounded text-[10px]">
                          🤖 Hi Shrutika! How can I help?
                        </div>
                        <div className="bg-primary text-white p-2 rounded text-[10px] ml-8">
                          What are library hours?
                        </div>
                      </div>
                      <div className="mt-2 flex gap-1">
                        <div className="flex-1 bg-gray-100 p-1 rounded text-[10px]">Type message...</div>
                        <div className="bg-primary text-white p-1 rounded">→</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  ✓ Header with logo + language + profile<br/>
                  ✓ Left sidebar with quick FAQs<br/>
                  ✓ Main chat area + input bar<br/>
                  ✓ Contact fallback options
                </div>
              </CardContent>
            </Card>
            
            <div className="my-6">
              <ArrowDown className="h-8 w-8 text-primary mx-auto animate-float" />
              <span className="text-sm font-medium text-primary">Access Dashboard</span>
            </div>
          </div>

          {/* Step 5: Student Dashboard */}
          <div className="text-center">
            <Card className="inline-block bg-white/80 backdrop-blur-sm shadow-card hover:shadow-chatbot transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-primary">5. Student Dashboard (Data View)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white border rounded-lg p-3 max-w-2xl mx-auto">
                  <div className="text-xs">
                    <div className="bg-gradient-campus text-white p-2 rounded mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px]">SP</div>
                        <span className="font-medium">Welcome back, Shrutika!</span>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <div className="bg-gray-200 p-1 rounded text-[10px]">History</div>
                      <div className="bg-gray-100 p-1 rounded text-[10px]">Recommended</div>
                      <div className="bg-gray-100 p-1 rounded text-[10px]">Profile</div>
                    </div>
                    <div className="space-y-1">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium text-[10px]">Library Hours and Study Rooms</div>
                        <div className="text-[8px] text-gray-500">8 messages • 30 min ago</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium text-[10px]">Course Registration</div>
                        <div className="text-[8px] text-gray-500">12 messages • 2 hours ago</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2 text-[10px] h-6">
                      📥 Export Chat History
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  ✓ Saved chat history tied to student ID<br/>
                  ✓ History, Recommended FAQs, Profile tabs<br/>
                  ✓ Download/export functionality
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Actions */}
          <div className="flex justify-center gap-4 pt-8">
            <Button onClick={() => navigate("/")} variant="campus">
              View Live Demo
            </Button>
            <Button onClick={() => navigate("/chat")} variant="campus-outline">
              Try Chat Interface
            </Button>
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              View Dashboard
            </Button>
          </div>
        </div>

        {/* Key Features Summary */}
        <Card className="mt-12 bg-gradient-campus text-white shadow-chatbot">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Key Design Features</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <LogIn className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Secure Authentication</h3>
              <p className="text-sm text-white/90">Student ID/Email + Password/OTP options</p>
            </div>
            <div className="text-center">
              <MessageCircle className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Intelligent Chat</h3>
              <p className="text-sm text-white/90">AI-powered multilingual responses</p>
            </div>
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Data Persistence</h3>
              <p className="text-sm text-white/90">Chat history & personalized recommendations</p>
            </div>
            <div className="text-center">
              <div className="h-8 w-8 mx-auto mb-2 bg-white/20 rounded flex items-center justify-center">
                📱
              </div>
              <h3 className="font-semibold mb-1">Mobile Responsive</h3>
              <p className="text-sm text-white/90">Clean UI with college branding</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}