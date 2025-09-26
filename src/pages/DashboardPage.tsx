import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CollegeLogo } from "@/components/CollegeLogo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { 
  ArrowLeft, 
  Download, 
  Search, 
  MessageCircle, 
  Clock, 
  User,
  Settings,
  Star,
  Filter,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  category: string;
}

interface RecommendedFAQ {
  id: string;
  question: string;
  category: string;
  popularity: number;
  lastAsked: Date;
}

export default function DashboardPage() {
  const [language, setLanguage] = useState("en");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const user = {
    name: "Shrutika Patel",
    email: "shrutika.patel@campus.edu",
    studentId: "ST2024001",
    department: "Computer Science",
    year: "Junior",
    joinDate: "August 2022"
  };

  const chatHistory: ChatHistory[] = [
    { id: "1", title: "Library Hours and Study Rooms", lastMessage: "Thank you! That helps a lot.", timestamp: new Date(Date.now() - 1000 * 60 * 30), messageCount: 8, category: "Facilities" },
    { id: "2", title: "Course Registration for Spring 2024", lastMessage: "When does registration open?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), messageCount: 12, category: "Academic" },
    { id: "3", title: "Campus Dining Options", lastMessage: "Perfect, thanks for the dining hall hours!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), messageCount: 5, category: "Dining" },
    { id: "4", title: "Student Health Services", lastMessage: "How do I schedule an appointment?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), messageCount: 6, category: "Health" },
    { id: "5", title: "Parking Information", lastMessage: "Where can I get a parking permit?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), messageCount: 4, category: "Transportation" }
  ];

  const recommendedFAQs: RecommendedFAQ[] = [
    { id: "1", question: "How to access online course materials?", category: "Academic", popularity: 95, lastAsked: new Date(Date.now() - 1000 * 60 * 60 * 6) },
    { id: "2", question: "Campus WiFi setup instructions", category: "Technology", popularity: 88, lastAsked: new Date(Date.now() - 1000 * 60 * 60 * 12) },
    { id: "3", question: "Student ID card replacement process", category: "Services", popularity: 82, lastAsked: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: "4", question: "Graduation requirements checklist", category: "Academic", popularity: 79, lastAsked: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
    { id: "5", question: "Financial aid office hours", category: "Financial", popularity: 76, lastAsked: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) }
  ];

  const filteredHistory = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportChatHistory = () => {
    const data = JSON.stringify(chatHistory, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campus-chat-history.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
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
           
            <Button
              onClick={() => navigate("/chat")}
              variant="campus"
              size="sm"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Open Chat
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Card */}
          <Card className="bg-gradient-campus text-white shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">Welcome back, {user.name.split(' ')[0]}!</CardTitle>
                    <CardDescription>
                      {user.department} • {user.year} • Student ID: {user.studentId}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90 flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="history" className="space-y-6">
            <TabsList className="grid grid-cols-3 bg-white/60 backdrop-blur-sm rounded-md overflow-hidden">
              <TabsTrigger value="history">Chat History</TabsTrigger>
              <TabsTrigger value="recommended">Recommended FAQs</TabsTrigger>
              <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            </TabsList>

            {/* Chat History */}
            <TabsContent value="history" className="space-y-6 max-h-[60vh] overflow-y-auto">
              <Card className="bg-white/60 backdrop-blur-sm border-white/30">
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" /> Chat History
                    </CardTitle>
                    <CardDescription>Your conversation history with Campus Assistant</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={exportChatHistory} variant="outline" size="sm">
                      <Download className="h-4 w-4" /> Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search chat history..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/70"
                    />
                  </div>
                  <div className="space-y-3">
                    {filteredHistory.map(chat => (
                      <Card key={chat.id} className="bg-white/50 hover:bg-white/70 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="font-semibold">{chat.title}</h3>
                              <Badge variant="secondary" className="text-xs">{chat.category}</Badge>
                              <Badge variant="outline" className="text-xs">{chat.messageCount} messages</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">"{chat.lastMessage}"</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {chat.timestamp.toLocaleDateString()} at {chat.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recommended FAQs */}
            <TabsContent value="recommended" className="space-y-6 max-h-[60vh] overflow-y-auto">
              <Card className="bg-white/60 backdrop-blur-sm border-white/30 space-y-3">
                {recommendedFAQs.map(faq => (
                  <Card key={faq.id} className="bg-white/50 hover:bg-white/70 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-medium">{faq.question}</h3>
                          <Badge variant="secondary" className="text-xs">{faq.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          <span>{faq.popularity}% helpful</span>
                          <span>Last asked: {faq.lastAsked.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="campus-outline" size="sm">Ask Question</Button>
                    </CardContent>
                  </Card>
                ))}
              </Card>
            </TabsContent>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" /> Profile Information
                  </CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={user.name} className="bg-white/70" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" value={user.email} className="bg-white/70" />
                      </div>
                      <div>
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input id="studentId" value={user.studentId} disabled className="bg-white/50" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" value={user.department} className="bg-white/70" />
                      </div>
                      <div>
                        <Label htmlFor="year">Academic Year</Label>
                        <Input id="year" value={user.year} className="bg-white/70" />
                      </div>
                      <div>
                        <Label htmlFor="joinDate">Member Since</Label>
                        <Input id="joinDate" value={user.joinDate} disabled className="bg-white/50" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button variant="campus">Save Changes</Button>
                    <Button variant="outline">Reset</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
