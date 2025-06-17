import { defineStore } from "pinia";

let ChatId = 1;
let MessageId = 1;

export const useStore = defineStore('store', {
    state: () => ({
        chats: [
        
        ],
        tokenGemeni: '',
        tokenGpt: '',
        currentСhatId: '',
    }),
    getters: {
        currentСhatMessages: (state) => {
            const currentСhat = state.chats.find(chat => chat.chatId === state.currentСhatId);
            if (currentСhat) return currentСhat.messages;
        },
    },
    actions: {
        changeChat(id) {
            this.currentСhatId = id;
        },
        newMessage(text) {
            if (!text) return
            this.currentСhatMessages.push({msgId: MessageId++, text, sender: "user"})
        },
        newChat(model){
            this.chats.push({chatId: ChatId++, messages: [{msgId: MessageId++, text: "Привет!", sender: model}], model, date: getFormattedDate()})
            this.currentСhatId = MessageId-1;
        }
    }
})

function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}`;
}