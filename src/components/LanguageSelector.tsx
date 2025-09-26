import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
];

export function LanguageSelector({ value, onChange, className }: LanguageSelectorProps) {
  const selectedLanguage = languages.find(lang => lang.code === value) || languages[0];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-[140px] bg-white/80 backdrop-blur-sm border-white/20 ${className}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm">{selectedLanguage.flag}</span>
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}