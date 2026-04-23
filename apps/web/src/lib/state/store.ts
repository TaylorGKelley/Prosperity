import { create } from 'zustand';

type UIStore = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  selectedBudgetId: string | null;
  setSelectedBudgetId: (id: string | null) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  selectedBudgetId: null,
  setSelectedBudgetId: (id: string | null) => set({ selectedBudgetId: id }),
}));
