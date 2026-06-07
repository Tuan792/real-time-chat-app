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
    <div className="relative w-full h-screen p-4">
      <div className="w-full h-full">
        <BorderAnimatedContainer>
          <div className="flex w-full h-full overflow-hidden">
            {/* LEFT SIDE */}
            <div className="w-80 shrink-0 bg-gradient-to-b from-indigo-600/80 to-purple-600/80 backdrop-blur-sm border-r border-indigo-400/30 flex flex-col">
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-indigo-600/60 to-purple-600/60 backdrop-blur-sm">
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