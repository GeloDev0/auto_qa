"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CodeInputProps {
  onSubmitCode: (code: string, userMessage?: string) => void;
  disabled?: boolean;
}

export function CodeInput({ onSubmitCode, disabled }: CodeInputProps) {
  const [code, setCode] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmitCode(code, userMessage.trim() || undefined);
      setCode("");
      setUserMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="min-h-[120px] font-mono text-sm"
        disabled={disabled}
      />
      <Textarea
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Optional: Add a message about what you want reviewed..."
        className="min-h-[60px]"
        disabled={disabled}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={disabled || !code.trim()}>
          Submit Code
        </Button>
      </div>
    </form>
  );
}
