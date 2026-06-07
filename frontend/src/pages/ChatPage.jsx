import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full">
      <div className="w-full max-w-[1200px] h-[800px] mx-auto">
        <BorderAnimatedContainer>
          <div className="flex h-full overflow-hidden">
            {/* Sidebar */}
            <div
              className={`
                ${selectedUser ? "hidden md:flex" : "flex"}
                w-full md:w-80
                flex-col
                bg-gradient-to-b
                from-indigo-600/80
                to-purple-600/80
                backdrop-blur-sm
                border-r border-indigo-400/30
              `}
            >
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>

            {/* Chat Area */}
            <div
              className={`
                ${selectedUser ? "flex" : "hidden md:flex"}
                flex-1
                min-w-0
                flex-col
                bg-gradient-to-br
                from-indigo-600/60
                to-purple-600/60
                backdrop-blur-sm
              `}
            >
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <NoConversationPlaceholder />
              )}
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;