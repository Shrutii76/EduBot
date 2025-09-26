import { GraduationCap } from "lucide-react";

interface CollegeLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function CollegeLogo({ size = "md", showText = true }: CollegeLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} bg-gradient-campus rounded-lg flex items-center justify-center shadow-card`}>
        <GraduationCap className="h-6 w-6 text-white" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold text-foreground`}>
            EduBot
          </h1>
          <p className="text-xs text-muted-foreground">Help Assistant</p>
        </div>
      )}
    </div>
  );
}