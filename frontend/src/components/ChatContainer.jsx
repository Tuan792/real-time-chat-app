import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { Trash2Icon } from "lucide-react";

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
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-6 py-8 overflow-y-auto w-full">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="space-y-6 w-full">
            {messages.map((msg) => {
              const isMine = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`chat ${
                    isMine ? "chat-end" : "chat-start"
                  } group`}
                >
                  <div className="relative inline-block">
                    {/* Tin nhắn giữ nguyên như cũ */}
                    <div
                      className={`chat-bubble rounded-2xl shadow-lg ${
                        isMine
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

                      {msg.text && <p>{msg.text}</p>}

                      <p className="text-xs mt-1 opacity-75">
                        {new Date(msg.createdAt).toLocaleTimeString(
                          undefined,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>

                    {/* Nút xóa */}
                    {isMine && (
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
                          -left-10
                          opacity-0
                          group-hover:opacity-100
                          transition-opacity
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          p-2
                          rounded-full
                          shadow-lg
                        "
                      >
                        <Trash2Icon size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;