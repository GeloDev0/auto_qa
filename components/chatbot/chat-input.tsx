"use client";

import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChatInputProps {
  onSendMessage: (content: string, code?: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [hasCode, setHasCode] = useState(false);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      // Detect if input contains code (simple heuristic)
      const codePatterns = [
        /function\s+\w+\s*\(/,
        /const\s+\w+\s*=/,
        /let\s+\w+\s*=/,
        /var\s+\w+\s*=/,
        /class\s+\w+/,
        /def\s+\w+\s*\(/,
        /public\s+class/,
        /#include/,
        /import\s+/,
        /from\s+.+\s+import/,
      ];

      const containsCode = codePatterns.some((pattern) => pattern.test(input));

      if (containsCode) {
        onSendMessage("Please review this code:", input.trim());
      } else {
        onSendMessage(input.trim());
      }

      setInput("");
      setHasCode(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }

    // Detect code as user types
    const value = (e.target as HTMLTextAreaElement).value;
    const codeIndicators = [
      "function",
      "const",
      "let",
      "var",
      "class",
      "def",
      "import",
      "export",
      "{",
      "}",
      ";",
    ];
    setHasCode(codeIndicators.some((indicator) => value.includes(indicator)));
  };

  const detectLanguage = (text: string): string | null => {
    if (
      text.includes("function") ||
      text.includes("const") ||
      text.includes("=>")
    )
      return "JavaScript";
    if (text.includes("def ") || text.includes("print(")) return "Python";
    if (text.includes("public class") || text.includes("System.out"))
      return "Java";
    if (text.includes("#include") || text.includes("int main")) return "C++";
    return null;
  };

  const language = hasCode ? detectLanguage(input) : null;

  return (
    <div className="space-y-3">
      {hasCode && (
        <Card className="p-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 text-sm">
            <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300">
              Code detected
            </span>
            {language && (
              <Badge
                variant="outline"
                className="text-xs border-blue-300 text-blue-700 dark:text-blue-300">
                {language}
              </Badge>
            )}
          </div>
        </Card>
      )}

      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message CodeGPT... (paste code or ask questions)"
            className="min-h-[60px] max-h-32 resize-none border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
            disabled={disabled}
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          size="icon"
          className="h-[60px] w-12 bg-blue-600 hover:bg-blue-700 text-white">
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
        {input.trim() && (
          <span>
            {input.split("\n").length} lines • {input.length} characters
          </span>
        )}
      </div>
    </div>
  );
}
