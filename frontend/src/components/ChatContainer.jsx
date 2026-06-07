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

      <div className="flex-1 px-6 py-8 overflow-y-auto w-full">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="space-y-6 w-full">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id
                    ? "chat-end"
                    : "chat-start"
                }`}
              >
                <div className="relative group inline-block">
                  <div
                    className={`chat-bubble rounded-2xl shadow-lg break-words ${
                      msg.senderId === authUser._id
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg max-w-full h-auto mb-2"
                      />
                    )}

                    {msg.text && (
                      <p className="whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    )}

                    <p className="text-xs mt-2 opacity-75">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {msg.senderId === authUser._id && (
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Bạn có chắc muốn xóa tin nhắn này?"
                          )
                        ) {
                          deleteMessage(msg._id);
                        }
                      }}
                      className="
                        absolute
                        top-1/2
                        -translate-y-1/2
                        right-full
                        mr-2
                        hidden
                        group-hover:flex
                        items-center
                        justify-center
                        w-8
                        h-8
                        rounded-full
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        shadow-lg
                        z-50
                      "
                    >
                      <Trash2Icon size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder
            name={selectedUser?.fullName}
          />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;