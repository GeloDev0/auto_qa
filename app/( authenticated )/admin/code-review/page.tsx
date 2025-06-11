// app/(authenticated)/admin/code-review/page.tsx
import { ChatInterface } from "@/components/chatbot/chat-interface";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate loading
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}
