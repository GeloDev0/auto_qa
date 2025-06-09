import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start space-x-3",
        isUser && "flex-row-reverse space-x-reverse"
      )}>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium",
          isUser ? "bg-blue-500" : "bg-green-500"
        )}>
        {isUser ? "U" : "AI"}
      </div>
      <div className="flex-1">
        <div
          className={cn(
            "rounded-lg px-4 py-3 max-w-3xl",
            isUser
              ? "bg-blue-500 text-white ml-auto"
              : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
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
