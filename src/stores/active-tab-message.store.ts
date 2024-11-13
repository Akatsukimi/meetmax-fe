import { create } from "zustand";

interface ActiveTabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useActiveTabStore = create<ActiveTabState>((set) => ({
  activeTab: "conversations",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
