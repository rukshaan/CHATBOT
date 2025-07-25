export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],

    setSelectedChatType: (selectedChatType) => {
        set({ selectedChatType });
    },

    setSelectedChatData: (selectedChatData) => {
        set({ selectedChatData });
    },

    setSelectedChatMessages: (selectedChatMessages) => {
        set({ selectedChatMessages });
    },

    closeChat: () => set({
        selectedChatType: undefined,
        selectedChatData: undefined,
        selectedChatMessages: []
    })
});
