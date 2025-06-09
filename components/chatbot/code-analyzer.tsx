"use client";

import { useState } from "react";
import { CodeInput } from "./code-input";
import { AnalysisOutput } from "./analysis-output";

interface AnalysisResult {
  id: string;
  content: string;
  timestamp: Date;
  isAnalyzing: boolean;
}

const codeReviewResponses = [
  {
    triggers: ["function", "const", "let", "var"],
    responses: [
      "[WARN] Variable declaration detected: Consider using 'const' or 'let' instead of 'var' for better scoping\n└── Prevents hoisting issues and improves code predictability",
      "[INFO] Function structure analysis: Good implementation detected\n├── Consider adding JSDoc comments for better documentation\n└── Suggestion: Add type annotations for parameters",
      "[WARN] Error handling missing: Function lacks proper error handling\n└── Recommendation: Add try/catch blocks for robustness",
    ],
  },
  {
    triggers: ["for", "while", "forEach", "map"],
    responses: [
      "[OPTIMIZE] Loop optimization available\n├── Current: Traditional for loop\n├── Suggested: Array.forEach() method\n└── Benefits: Better readability, functional programming approach",
      "[GOOD] Functional programming detected: Excellent use of map()\n├── Ensures immutability\n└── Tip: Verify return statement for proper data transformation",
      "[OPTIMIZE] Algorithm enhancement possible\n├── filter() - for data filtering operations\n├── reduce() - for aggregation operations\n└── find() - for single item lookup",
    ],
  },
  {
    triggers: ["==", "!="],
    responses: [
      "[ERROR] Type coercion risk detected\n├── Issue: Loose equality operator '==' found\n├── Risk: Unexpected type conversion bugs\n├── Fix: Use strict equality '===' instead\n└── Impact: Prevents runtime errors",
      "[WARN] Comparison operator warning\n├── Detected: Loose equality comparison\n├── Problem: JavaScript type coercion\n└── Solution: Use '===' for type-safe comparisons",
    ],
  },
  {
    triggers: ["console.log"],
    responses: [
      "[WARN] Debug statement detected\n├── Found: console.log() in code\n├── Action: Remove before production deployment\n└── Alternative: Implement proper logging strategy",
      "[INFO] Logging best practice\n├── Current: console.log() usage\n├── Recommendation: Use structured logging library\n└── Examples: Winston, Pino, or similar",
    ],
  },
  {
    triggers: ["async", "await", "Promise"],
    responses: [
      "[GOOD] Async/await pattern detected\n├── Modern JavaScript async handling\n├── Enhancement: Add comprehensive error handling\n├── Suggestion: Implement timeout mechanisms\n└── Best practice: Add proper error context",
      "[INFO] Promise implementation found\n├── Good: Proper async pattern usage\n├── Missing: .catch() error handlers\n└── Recommendation: Prevent unhandled promise rejections",
    ],
  },
];

const generalResponses = [
  "[ANALYSIS] Code structure review completed\n├── Overall: Clean implementation detected\n├── Status: Ready for enhancement suggestions\n└── Recommendations follow below:",
  "[SCAN] Performance and readability analysis\n├── Issues found: Multiple optimization opportunities\n├── Priority: Medium to high impact improvements\n└── Details: See suggestions below",
  "[REVIEW] Best practices assessment\n├── Code quality: Good foundation\n├── Compliance: Industry standards check\n└── Enhancements: Professional recommendations available",
  "[AUDIT] Maintainability analysis complete\n├── Structure: Solid implementation\n├── Improvements: Strategic enhancements identified\n└── Focus: Production-ready optimizations",
];

const syntaxErrorResponses = [
  "[ERROR] Syntax error detected at line 3\n├── Issue: Missing semicolon\n├── Impact: Potential parsing ambiguity\n├── Fix: Add ';' at statement end\n└── Note: Explicit semicolons prevent ASI issues",
  "[ERROR] Parsing failure detected\n├── Issue: Unmatched bracket found\n├── Impact: Code will not execute\n├── Fix: Balance all opening/closing brackets\n└── Tip: Use IDE bracket matching for debugging",
  "[ERROR] Function call syntax error\n├── Issue: Missing closing parenthesis\n├── Impact: SyntaxError at runtime\n├── Fix: Add missing ')' character\n└── Location: Function invocation statement",
  "[ERROR] Variable reference error\n├── Issue: Undefined variable detected\n├── Impact: ReferenceError at runtime\n├── Fix: Declare variable before use\n└── Best practice: Use 'const' for immutable values",
];

function generateCodeReview(code: string): string {
  const lowerCode = code.toLowerCase();

  // Check for syntax errors (simplified)
  if (Math.random() < 0.3) {
    return syntaxErrorResponses[
      Math.floor(Math.random() * syntaxErrorResponses.length)
    ];
  }

  // Find matching triggers
  const matchingResponses = codeReviewResponses.filter((item) =>
    item.triggers.some((trigger) => lowerCode.includes(trigger))
  );

  if (matchingResponses.length > 0) {
    const randomCategory =
      matchingResponses[Math.floor(Math.random() * matchingResponses.length)];
    const response =
      randomCategory.responses[
        Math.floor(Math.random() * randomCategory.responses.length)
      ];

    // Add additional suggestions
    const additionalSuggestions = [
      "\n[SUGGESTIONS] Additional recommendations:",
      "├── TypeScript: Consider migration for type safety",
      "├── Testing: Implement unit tests (Jest/Vitest)",
      "├── Documentation: Add comprehensive JSDoc comments",
      "├── Performance: Profile critical execution paths",
      "├── Security: Validate and sanitize all inputs",
      "└── Accessibility: Follow WCAG guidelines (if UI-related)",
    ];

    return (
      response +
      additionalSuggestions
        .slice(0, Math.floor(Math.random() * 4) + 3)
        .join("\n")
    );
  }

  // General response
  const generalResponse =
    generalResponses[Math.floor(Math.random() * generalResponses.length)];
  const suggestions = [
    "├── Modularity: Break large functions into smaller units",
    "├── Documentation: Add explanatory comments for complex logic",
    "├── Naming: Use descriptive, intention-revealing identifiers",
    "├── Error handling: Implement comprehensive edge case management",
    "├── Code style: Apply consistent formatting (Prettier/ESLint)",
    "├── Performance: Optimize algorithmic complexity where needed",
    "├── Security: Follow secure coding practices",
    "└── Maintainability: Structure for future modifications",
  ];

  const randomSuggestions = suggestions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 4) + 4);

  return generalResponse + "\n" + randomSuggestions.join("\n");
}

export function CodeAnalyzer() {
  const [analysis, setAnalysis] = useState<AnalysisResult>({
    id: "welcome",
    content:
      "[INIT] AI Code Reviewer v1.0.0 initialized\n├── Status: Ready for code analysis\n├── Supported: JavaScript, Python, Java, C++, TypeScript\n├── Features: Syntax validation, performance analysis, best practices\n├── Input: Paste code in left terminal\n└── Output: Analysis results in right terminal\n\n[READY] Waiting for code input...",
    timestamp: new Date(),
    isAnalyzing: false,
  });

  const handleAnalyzeCode = async (code: string, userMessage?: string) => {
    // Set analyzing state
    setAnalysis({
      id: Date.now().toString(),
      content: "",
      timestamp: new Date(),
      isAnalyzing: true,
    });

    // Simulate analysis delay
    const delay = Math.random() * 2000 + 1500; // 1.5-3.5 seconds

    setTimeout(() => {
      const review = generateCodeReview(code);
      setAnalysis({
        id: Date.now().toString(),
        content: review,
        timestamp: new Date(),
        isAnalyzing: false,
      });
    }, delay);
  };

  return (
    <div className="flex h-full">
      {/* Left Panel - Code Input Terminal */}
      <div className="w-1/2 border-r border-green-500/30 bg-gray-900">
        <div className="h-full flex flex-col">
          <div className="border-b border-green-500/30 px-4 py-3 bg-black">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 font-mono">$</span>
              <h2 className="text-lg font-mono font-bold text-green-400">
                code-input
              </h2>
              <span className="text-gray-500 font-mono text-sm">terminal</span>
            </div>
            <p className="text-sm text-gray-400 font-mono ml-6">
              <span className="text-cyan-400">//</span> Paste or type your code
              below
            </p>
          </div>
          <div className="flex-1 p-4">
            <CodeInput
              onAnalyzeCode={handleAnalyzeCode}
              disabled={analysis.isAnalyzing}
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Analysis Output Terminal */}
      <div className="w-1/2 bg-black">
        <div className="h-full flex flex-col">
          <div className="border-b border-green-500/30 px-4 py-3 bg-gray-900">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 font-mono">$</span>
              <h2 className="text-lg font-mono font-bold text-green-400">
                analysis-output
              </h2>
              <span className="text-gray-500 font-mono text-sm">terminal</span>
            </div>
            <p className="text-sm text-gray-400 font-mono ml-6">
              <span className="text-cyan-400">//</span> AI-powered code analysis
              results
            </p>
          </div>
          <div className="flex-1 p-4">
            <AnalysisOutput analysis={analysis} />
          </div>
        </div>
      </div>
    </div>
  );
}
