import { useEffect, useRef } from "react";
import { Trash2Icon } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <ChatHeader />

      <div className="space-y-4 w-full">
  {messages.map((msg) => {
    const isMine = msg.senderId === authUser._id;

    return (
      <div
        key={msg._id}
        className={`flex ${isMine ? "justify-end" : "justify-start"} group`}
      >
        <div className="relative max-w-[80%]">
          {/* Nút xóa chỉ hiện khi hover */}
          {isMine && (
            <button
              onClick={() => deleteMessage(msg._id)}
              className="
                absolute
                -left-10
                top-1/2
                -translate-y-1/2
                opacity-0
                group-hover:opacity-100
                transition
                bg-red-500
                hover:bg-red-600
                p-2
                rounded-full
              "
            >
              <Trash2Icon size={16} className="text-white" />
            </button>
          )}

          <div
            className={`
              px-4
              py-3
              rounded-2xl
              shadow-lg
              break-words
              whitespace-pre-wrap
              ${
                isMine
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800 text-slate-200"
              }
            `}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="Shared"
                className="rounded-lg mb-2 max-w-full"
              />
            )}

            {msg.text && (
              <p className="text-base leading-relaxed">
                {msg.text}
              </p>
            )}

            <p className="text-xs opacity-70 mt-2">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    );
  })}

  <div ref={messageEndRef} />
</div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;