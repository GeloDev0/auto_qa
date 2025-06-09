"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  code?: string;
  language?: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const codeReviewResponses = [
  {
    triggers: ["function", "const", "let", "var"],
    responses: [
      "I notice you're using `var` here. Consider using `const` or `let` instead for better scoping and to avoid hoisting issues. This will make your code more predictable and easier to debug.",
      "Your function structure looks good! To make it even better, consider adding JSDoc comments for documentation and type hints for better IDE support.",
      "This function could benefit from some error handling. Adding try-catch blocks or input validation would make it more robust in production.",
    ],
  },
  {
    triggers: ["for", "while", "forEach", "map"],
    responses: [
      "I see you're using a traditional for loop. Consider using `forEach()` or `map()` for better readability and a more functional programming approach.",
      "Great use of `map()`! This is perfect for transforming arrays. Just make sure you're returning the transformed data and not causing side effects.",
      "This loop could be optimized depending on what you're trying to achieve. Consider using `filter()` for filtering data, `reduce()` for aggregation, or `find()` for single item lookup.",
    ],
  },
  {
    triggers: ["==", "!="],
    responses: [
      "⚠️ I found a potential issue here. You're using loose equality (`==`) which can lead to unexpected type coercion. Consider using strict equality (`===`) instead for safer comparisons.",
      "Using `==` can cause subtle bugs due to JavaScript's type coercion rules. I'd recommend switching to `===` to ensure both value and type match.",
    ],
  },
  {
    triggers: ["console.log"],
    responses: [
      "I see some `console.log()` statements in your code. Don't forget to remove these before deploying to production! Consider implementing a proper logging strategy instead.",
      "For production code, consider using a structured logging library like Winston or Pino instead of `console.log()`. This gives you better control over log levels and output formatting.",
    ],
  },
  {
    triggers: ["async", "await", "Promise"],
    responses: [
      "Excellent use of async/await! To make this even more robust, consider adding comprehensive error handling with try-catch blocks and maybe some timeout logic.",
      "Your Promise handling looks solid. Just make sure to add `.catch()` handlers to prevent unhandled promise rejections, which can crash your application.",
    ],
  },
];

const generalResponses = [
  "I've analyzed your code and it has a solid foundation! Here are some suggestions to make it even better:",
  "Your code structure is clean and well-organized. I've identified a few areas where we can enhance performance and maintainability:",
  "Nice work on this implementation! Here are some best practices and optimizations that could take your code to the next level:",
  "I can see you've put thought into this code. Let me share some recommendations that align with modern development standards:",
];

const syntaxErrorResponses = [
  "I found a syntax error in your code. There's a missing semicolon on line 3. While JavaScript has automatic semicolon insertion, it's good practice to include them explicitly to avoid parsing ambiguity.",
  "There's a syntax issue here - I detected an unmatched bracket. Make sure all opening brackets have corresponding closing brackets. Your IDE's bracket matching feature can help with this!",
  "I spotted a syntax error: there's a missing closing parenthesis in one of your function calls. This will prevent your code from running.",
  "There's an undefined variable in your code. Make sure to declare all variables with `const`, `let`, or `var` before using them. I'd recommend `const` for values that don't change and `let` for those that do.",
];

function detectLanguage(code: string): string {
  if (
    code.includes("import ") ||
    code.includes("export ") ||
    code.includes("const ") ||
    code.includes("=>")
  ) {
    return "javascript";
  }
  if (
    code.includes("def ") ||
    code.includes("import ") ||
    code.includes("print(")
  ) {
    return "python";
  }
  if (
    code.includes("#include") ||
    code.includes("int main") ||
    code.includes("cout")
  ) {
    return "cpp";
  }
  if (code.includes("public class") || code.includes("System.out")) {
    return "java";
  }
  return "text";
}

function generateCodeReview(code: string): string {
  const lowerCode = code.toLowerCase();

  // Check for syntax errors (simplified)
  if (Math.random() < 0.25) {
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
      "\n\n**Additional recommendations:**\n",
      "• **TypeScript**: Consider migrating to TypeScript for better type safety and developer experience\n",
      "• **Testing**: Add unit tests with Jest or Vitest to ensure code reliability\n",
      "• **Documentation**: Include JSDoc comments for better code documentation\n",
      "• **Performance**: Profile your code to identify and optimize bottlenecks\n",
      "• **Security**: Validate all inputs and follow secure coding practices",
    ];

    const selectedSuggestions = additionalSuggestions.slice(
      0,
      Math.floor(Math.random() * 3) + 3
    );
    return response + selectedSuggestions.join("");
  }

  // General response
  const generalResponse =
    generalResponses[Math.floor(Math.random() * generalResponses.length)];
  const suggestions = [
    "\n• **Modularity**: Break down large functions into smaller, focused functions\n",
    "• **Naming**: Use descriptive names that clearly express intent\n",
    "• **Error Handling**: Add comprehensive error handling for edge cases\n",
    "• **Code Style**: Use tools like Prettier and ESLint for consistent formatting\n",
    "• **Performance**: Consider algorithmic complexity and optimize where needed\n",
    "• **Maintainability**: Structure code to be easily modified and extended",
  ];

  const randomSuggestions = suggestions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 3);

  return generalResponse + "\n" + randomSuggestions.join("");
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm CodeGPT, your AI code review assistant. I can help you analyze code for potential improvements, catch bugs, and suggest best practices.\n\nFeel free to paste any code snippet, and I'll provide detailed feedback and suggestions. I support JavaScript, Python, Java, C++, and many other languages!",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing]);

  const handleSendMessage = async (content: string, code?: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      code,
      language: code ? detectLanguage(code) : undefined,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAnalyzing(true);

    // Simulate analysis delay
    const delay = Math.random() * 2000 + 1500; // 1.5-3.5 seconds

    setTimeout(() => {
      const review = code
        ? generateCodeReview(code)
        : "I'd be happy to help! Please share some code and I'll analyze it for you.";
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: review,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsAnalyzing(false);
    }, delay);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isAnalyzing && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-medium">
                AI
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 max-w-3xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Analyzing your code...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <ChatInput onSendMessage={handleSendMessage} disabled={isAnalyzing} />
      </div>
    </div>
  );
}
