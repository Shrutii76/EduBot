import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (userData: { name: string; email: string; type: "student" | "admin" }) => void;
}

export function LoginDialog({ open, onOpenChange, onLogin }: LoginDialogProps) {
  const [studentId, setStudentId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");

  const handleStudentLogin = () => {
    onLogin({
      name: "Shrutika Patel",
      email: "shrutika.patel@campus.edu",
      type: "student",
    });
    onOpenChange(false);
  };

  const handleAdminAccess = () => {
    onLogin({
      name: "Admin User",
      email: "admin@campus.edu",
      type: "admin",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-campus bg-clip-text text-transparent">
            Campus Login
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Access your personalized campus assistant
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student Login</TabsTrigger>
              <TabsTrigger value="admin">Admin Login</TabsTrigger>
            </TabsList>

            {/* Student Login Tab */}
            <TabsContent value="student" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Student Portal</CardTitle>
                  <CardDescription>Login with your student credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID / Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="student-id"
                        placeholder="Enter your student ID or email"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleStudentLogin}
                    className="w-full"
                    variant="campus"
                    disabled={!studentId || !password}
                  >
                    Login as Student
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Admin Login Tab */}
            <TabsContent value="admin" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Admin Login</CardTitle>
                  <CardDescription>Access general FAQs and information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-id">Admin ID / Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-id"
                        placeholder="Enter your admin ID or email"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="text-center space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground">
                      Continue as admin to access general campus information and frequently asked questions.
                    </p>
                    <Button onClick={handleAdminAccess} variant="cta" className="w-full" disabled={!adminId}>
                      Continue as Admin
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
