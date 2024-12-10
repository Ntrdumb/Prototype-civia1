import { create } from "zustand";

const useNavStore = create((set) => ({
    chatbotVisibility: true, 
    toggleChatbotVisibility: () => set((state) => ({ chatbotVisibility: !state.chatbotVisibility })),

    chartVisibility: true, 
    toggleChartVisibility: () => set((state) => ({ chartVisibility: !state.chartVisibility })),
    
    filtersVisibility: false, 
    toggleFiltersVisibility: () => set((state) => ({ filtersVisibility: !state.filtersVisibility })),
}));

export default useNavStore;