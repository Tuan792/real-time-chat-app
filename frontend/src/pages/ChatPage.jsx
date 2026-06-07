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
    <div className="relative w-full min-h-screen md:h-[800px] max-w-[1200px] mx-auto bg-gradient-to-b from-purple-900 to-blue-900 p-4 rounded-xl">
      <BorderAnimatedContainer>
        <div className="flex flex-col md:flex-row h-full rounded-xl overflow-hidden">
          {/* LEFT SIDE */}
          <div
  className={`
    ${selectedUser ? "hidden md:flex" : "flex"}
    w-full md:w-80
    flex-col
    bg-gradient-to-b from-indigo-600/80 to-purple-600/80
    backdrop-blur-sm
    border-r border-indigo-400/30
  `}
>            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-scroll p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE */}
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
    shadow-inner
  `}
>
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;