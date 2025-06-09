"use client";

import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Play } from "lucide-react";

interface CodeInputProps {
  onAnalyzeCode: (code: string, message?: string) => void;
  disabled?: boolean;
}

export function CodeInput({ onAnalyzeCode, disabled = false }: CodeInputProps) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (code.trim() && !disabled) {
      onAnalyzeCode(code.trim(), message.trim() || undefined);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }

    // Handle tab indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;

      setCode(value.substring(0, start) + "  " + value.substring(end));

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const detectLanguage = (code: string): string => {
    if (
      code.includes("import ") ||
      code.includes("export ") ||
      code.includes("const ") ||
      code.includes("=>")
    ) {
      return "javascript";
    }
    if (code.includes("def ") || code.includes("print(")) {
      return "python";
    }
    if (code.includes("#include") || code.includes("int main")) {
      return "cpp";
    }
    if (code.includes("public class") || code.includes("System.out")) {
      return "java";
    }
    return "text";
  };

  const language = code.trim() ? detectLanguage(code) : null;

  const getLanguageColor = (lang: string) => {
    const colors = {
      javascript: "text-yellow-400",
      python: "text-blue-400",
      cpp: "text-purple-400",
      java: "text-red-400",
      text: "text-gray-400",
    };
    return colors[lang as keyof typeof colors] || colors.text;
  };

  return (
    <div className="h-full flex flex-col space-y-4 bg-black rounded border border-green-500/30">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-green-500/30">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 font-mono text-sm">editor.js</span>
        </div>
        {language && (
          <span className={`text-xs font-mono ${getLanguageColor(language)}`}>
            {language.toUpperCase()}
          </span>
        )}
      </div>

      {/* Code textarea */}
      <div className="flex-1 flex flex-col px-3">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-green-400 font-mono text-sm">1</span>
          <span className="text-gray-500 font-mono text-sm">|</span>
        </div>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="// Enter your code here...
function example() {
  console.log('Hello, terminal!');
}

// Ctrl+Enter to analyze"
          className="flex-1 bg-transparent border-none text-green-300 font-mono text-sm resize-none focus:ring-0 focus:outline-none placeholder-gray-600 min-h-[300px]"
          disabled={disabled}
        />
      </div>

      {/* Command line input */}
      <div className="px-3 pb-3 space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-green-400 font-mono">$</span>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="additional analysis flags (optional)"
            className="bg-transparent border-green-500/30 text-green-300 font-mono text-sm focus:border-green-400 placeholder-gray-600"
            disabled={disabled}
          />
        </div>

        {/* Stats and execute */}
        <div className="flex justify-between items-center">
          <div className="text-xs font-mono text-gray-500">
            {code.trim() && (
              <span>
                <span className="text-cyan-400">{code.split("\n").length}</span>{" "}
                lines • <span className="text-yellow-400">{code.length}</span>{" "}
                chars
              </span>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!code.trim() || disabled}
            className="bg-green-600 hover:bg-green-700 text-black font-mono text-sm border border-green-500">
            <Play className="h-4 w-4 mr-1" />
            {disabled ? "ANALYZING..." : "EXECUTE"}
          </Button>
        </div>

        <div className="text-xs font-mono text-gray-600">
          <span className="text-cyan-400">Tip:</span> Tab for indent •
          Ctrl+Enter to execute
        </div>
      </div>
    </div>
  );
}
