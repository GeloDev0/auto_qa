"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  id: string;
  content: string;
  code?: string;
  language?: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface CodeMessageProps {
  message: ChatMessage;
}

export function CodeMessage({ message }: CodeMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (message.code) {
      await navigator.clipboard.writeText(message.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting for AI responses
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/⚠️/g, '<span class="text-yellow-500">⚠️</span>')
      .replace(/•/g, '<span class="text-blue-500">•</span>');
  };

  return (
    <div
      className={cn(
        "flex items-start space-x-3",
        isUser && "flex-row-reverse space-x-reverse"
      )}>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0",
          isUser ? "bg-blue-500" : "bg-purple-500"
        )}>
        {isUser ? "U" : "AI"}
      </div>
      <div className="flex-1 min-w-0">
        <div className={cn("rounded-lg max-w-4xl", isUser ? "ml-auto" : "")}>
          {/* Message content */}
          <div
            className={cn(
              "px-4 py-3 rounded-lg",
              isUser
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            )}>
            <div
              className="text-sm leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: formatContent(message.content),
              }}
            />
          </div>

          {/* Code block */}
          {message.code && (
            <Card className="mt-3 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {message.language || "code"}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {message.code.split("\n").length} lines
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyCode}
                  className="h-6 w-6 p-0">
                  {copied ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <div className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
                <pre className="text-sm">
                  <code>{message.code}</code>
                </pre>
              </div>
            </Card>
          )}
        </div>

        <div
          className={cn("text-xs text-gray-500 mt-1", isUser && "text-right")}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
