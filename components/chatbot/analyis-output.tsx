"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

interface AnalysisResult {
  id: string;
  content: string;
  timestamp: Date;
  isAnalyzing: boolean;
}

interface AnalysisOutputProps {
  analysis: AnalysisResult;
}

export function AnalysisOutput({ analysis }: AnalysisOutputProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!analysis.isAnalyzing && analysis.content) {
      setIsTyping(true);
      setDisplayedContent("");

      // Simulate terminal typing effect
      let i = 0;
      const content = analysis.content;
      const timer = setInterval(() => {
        if (i < content.length) {
          setDisplayedContent(content.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 20); // Adjust speed here

      return () => clearInterval(timer);
    }
  }, [analysis.content, analysis.isAnalyzing]);

  const formatContent = (content: string) => {
    return content
      .replace(
        /\[ERROR\]/g,
        '<span class="text-red-400 font-bold">[ERROR]</span>'
      )
      .replace(
        /\[WARN\]/g,
        '<span class="text-yellow-400 font-bold">[WARN]</span>'
      )
      .replace(
        /\[INFO\]/g,
        '<span class="text-blue-400 font-bold">[INFO]</span>'
      )
      .replace(
        /\[GOOD\]/g,
        '<span class="text-green-400 font-bold">[GOOD]</span>'
      )
      .replace(
        /\[OPTIMIZE\]/g,
        '<span class="text-purple-400 font-bold">[OPTIMIZE]</span>'
      )
      .replace(
        /\[ANALYSIS\]/g,
        '<span class="text-cyan-400 font-bold">[ANALYSIS]</span>'
      )
      .replace(
        /\[SCAN\]/g,
        '<span class="text-cyan-400 font-bold">[SCAN]</span>'
      )
      .replace(
        /\[REVIEW\]/g,
        '<span class="text-cyan-400 font-bold">[REVIEW]</span>'
      )
      .replace(
        /\[AUDIT\]/g,
        '<span class="text-cyan-400 font-bold">[AUDIT]</span>'
      )
      .replace(
        /\[SUGGESTIONS\]/g,
        '<span class="text-magenta-400 font-bold">[SUGGESTIONS]</span>'
      )
      .replace(
        /\[INIT\]/g,
        '<span class="text-green-400 font-bold">[INIT]</span>'
      )
      .replace(
        /\[READY\]/g,
        '<span class="text-green-400 font-bold">[READY]</span>'
      )
      .replace(/├──/g, '<span class="text-gray-500">├──</span>')
      .replace(/└──/g, '<span class="text-gray-500">└──</span>')
      .replace(/│/g, '<span class="text-gray-500">│</span>');
  };

  if (analysis.isAnalyzing) {
    return (
      <div className="h-full bg-black rounded border border-green-500/30">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-green-500/30">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 font-mono text-sm">
              analysis.log
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-mono text-xs">RUNNING</span>
          </div>
        </div>

        {/* Loading content */}
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-green-400 font-mono">$</span>
            <span className="text-green-300 font-mono">
              ai-analyzer --input=code.js --verbose
            </span>
          </div>

          <div className="space-y-2 font-mono text-sm">
            <div className="text-cyan-400">
              [INIT] Starting code analysis engine...
            </div>
            <div className="text-blue-400">
              [LOAD] Loading syntax parsers...
            </div>
            <div className="text-yellow-400">
              [SCAN] Analyzing code structure...
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-400">[PROC]</span>
              <span className="text-gray-300">Processing</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                <div
                  className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}></div>
                <div
                  className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black rounded border border-green-500/30">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-green-500/30">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 font-mono text-sm">analysis.log</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 font-mono text-xs">
            {analysis.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
          {!isTyping && (
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          )}
        </div>
      </div>

      {/* Terminal content */}
      <ScrollArea className="h-full">
        <div className="p-4 space-y-1">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-green-400 font-mono">$</span>
            <span className="text-green-300 font-mono">
              ai-analyzer --input=code.js --output=analysis.log
            </span>
          </div>

          <div
            className="font-mono text-sm text-green-300 whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: formatContent(displayedContent),
            }}
          />

          {isTyping && (
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
          )}

          {!isTyping && !analysis.isAnalyzing && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-green-400 font-mono">$</span>
              <span className="text-gray-500 font-mono animate-pulse">_</span>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
