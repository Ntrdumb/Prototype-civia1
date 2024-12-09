import { create } from "zustand";

const useNavStore = create((set) => ({
    chatbotVisibility: true, 
    toggleChatbotVisibility: () => set((state) => ({ chatbotVisibility: !state.chatbotVisibility })),
}));

export default useNavStore;