"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, MessageSquare, Settings, List } from "lucide-react";
import { clearAuthSession } from "@/lib/local-auth";
import { ConversationsPanel } from "./conversations-panel";
import { ChatPanel } from "./chat-panel";
import { SettingsPanel } from "./settings-panel";
import { CreateConversationModal } from "./create-conversation-modal";
import { useConversationSimulator } from "./use-conversation-simulator";
import type { ConversationFormData } from "./types";

type MobileTab = "conversations" | "chat" | "settings";

const MOBILE_TABS: { id: MobileTab; icon: typeof List; label: string }[] = [
  { id: "conversations", icon: List, label: "שיחות" },
  { id: "chat", icon: MessageSquare, label: "צ׳אט" },
  { id: "settings", icon: Settings, label: "הגדרות" },
];

export function VisionCostExplorerShell() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("conversations");
  const {
    conversations,
    messages,
    selectedId,
    selectedConversation,
    setSelectedId,
    createConversation,
    startConversation,
    pauseConversation,
    deleteConversation,
    duplicateConversation,
    resetCounters,
    updateConversation,
  } = useConversationSimulator();

  const handleCreate = (data: ConversationFormData) => {
    const id = createConversation(data);
    startConversation(id);
  };

  const handleLogout = () => {
    clearAuthSession();
    router.push("/login");
  };

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setMobileTab("chat");
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-white">
      {/* Top bar */}
      <div className="h-12 border-b border-neutral-800 flex items-center justify-between px-4 flex-shrink-0 safe-top">
        <div className="flex items-center gap-3">
          <Image
            src="/ghost-icon.png"
            alt="Ghost"
            width={24}
            height={24}
            className="rounded-md"
          />
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold hidden sm:inline">
            Ghost Vision — Cost Explorer
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold sm:hidden">
            Cost Explorer
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[10px] text-neutral-500 hover:text-white transition-colors min-h-[44px] min-w-[44px] justify-center"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">יציאה</span>
        </button>
      </div>

      {/* Desktop: 3-panel layout */}
      <div className="flex-1 hidden md:flex overflow-hidden" dir="rtl">
        <ConversationsPanel
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onNewConversation={() => setIsModalOpen(true)}
        />

        <ChatPanel
          conversation={selectedConversation}
          messages={messages}
        />

        <SettingsPanel
          conversation={selectedConversation}
          onStart={startConversation}
          onPause={pauseConversation}
          onDelete={deleteConversation}
          onDuplicate={duplicateConversation}
          onResetCounters={resetCounters}
          onUpdate={updateConversation}
        />
      </div>

      {/* Mobile: Tab-based layout */}
      <div className="flex-1 flex flex-col md:hidden overflow-hidden" dir="rtl">
        <div className="flex-1 overflow-hidden">
          {mobileTab === "conversations" && (
            <ConversationsPanel
              conversations={conversations}
              selectedId={selectedId}
              onSelect={handleSelectConversation}
              onNewConversation={() => setIsModalOpen(true)}
              isMobile
            />
          )}
          {mobileTab === "chat" && (
            <ChatPanel
              conversation={selectedConversation}
              messages={messages}
            />
          )}
          {mobileTab === "settings" && (
            <SettingsPanel
              conversation={selectedConversation}
              onStart={startConversation}
              onPause={pauseConversation}
              onDelete={deleteConversation}
              onDuplicate={duplicateConversation}
              onResetCounters={resetCounters}
              onUpdate={updateConversation}
              isMobile
            />
          )}
        </div>

        {/* Mobile tab bar */}
        <div className="flex items-center border-t border-neutral-800 bg-neutral-950 safe-bottom">
          {MOBILE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMobileTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
                mobileTab === tab.id
                  ? "text-white"
                  : "text-neutral-600"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <CreateConversationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
