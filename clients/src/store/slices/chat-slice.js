export const createChatSlice = (set,get) => ({
    selectedChatType:undefined,
    selectedChatData:undefined,
    setSelectedChatType:(selectedChatType)=>{set({selectedChatType})},
});