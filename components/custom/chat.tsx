"use client";

import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { useState } from "react";

import { Message as PreviewMessage } from "@/components/custom/message";
import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";

import { MultimodalInput } from "./multimodal-input";

export function Chat({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages: Array<Message>;
}) {
  const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
    useChat({
      id,
      body: { id },
      initialMessages,
      maxSteps: 10,
      onFinish: () => {
        window.history.replaceState({}, "", `/chat/${id}`);
      },
    });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const [isOpen, setIsOpen] = useState(true);

  const openChat = () => {
    setIsOpen(true);
    window.parent.postMessage("concierge:open", "*");
  };

  const closeChat = () => {
    setIsOpen(false);
    window.parent.postMessage("concierge:close", "*");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="mb-2 size-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition"
          style={{ backgroundColor: "#C3E54B" }}
        >
          💬
        </button>
      )}

      {/* Chat popup */}
      {isOpen && (
        <div
          className="flex flex-col border border-border rounded-2xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: "#ffffff",
            width: "min(384px, calc(100vw - 24px))",
            height: "min(520px, calc(100dvh - 100px))",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 text-black text-sm font-semibold shrink-0"
            style={{ backgroundColor: "#C3E54B" }}
          >
            <span>TourenUp Concierge</span>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex flex-col gap-2 flex-1 overflow-y-auto p-3"
          >
            {messages.map((message) => (
              <PreviewMessage
                key={message.id}
                chatId={id}
                role={message.role}
                content={message.content}
                attachments={message.experimental_attachments}
                toolInvocations={message.toolInvocations}
              />
            ))}

            <div
              ref={messagesEndRef}
              className="shrink-0 min-w-[24px] min-h-[24px]"
            />
          </div>

          {/* Input */}
          <form className="flex flex-row gap-2 p-2 border-t border-border shrink-0">
            <MultimodalInput
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              append={append}
            />
          </form>
        </div>
      )}
    </div>
  );
}
