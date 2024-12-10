import { create } from "zustand";

const useChatStore = create((set) => ({
    chunks : null,
    setChunks: (newChunks) => set({ chunks: newChunks }),
}));

export default useChatStore;