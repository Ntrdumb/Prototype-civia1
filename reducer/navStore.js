import { create } from "zustand";

const useNavStore = create((set) => ({
    chatbotVisibility: false, 
    toggleChatbotVisibility: () => set((state) => ({ chatbotVisibility: !state.chatbotVisibility })),

    chartVisibility: false, 
    toggleChartVisibility: () => set((state) => ({ chartVisibility: !state.chartVisibility })),
    
    filtersVisibility: false, 
    toggleFiltersVisibility: () => set((state) => ({ filtersVisibility: !state.filtersVisibility })),

    uploadVisibility: false, 
    toggleUploadVisibility: () => set((state) => ({ uploadVisibility: !state.uploadVisibility })),
}));

export default useNavStore;