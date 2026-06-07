import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button
        onClick={() => setActiveTab("Tin nhắn")}
        className={`tab ${
          activeTab === "Tin nhắn" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
        }`}
      >
        Tin nhắn
      </button>

      <button
        onClick={() => setActiveTab("Liên hệ")}
        className={`tab ${
          activeTab === "Liên hệ" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
        }`}
      >
        Liên hệ
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
