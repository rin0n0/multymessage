import { defineStore } from "pinia";

//let chatId = 1;
let messageId = 2;

export const useStore = defineStore('store', {
    state: () => ({
        chats: [
            {
                chatId: '0',
                messages: [
                    {
                        msgId: '0',
                        text: 'aboba????',
                        sender: 'user',
                    },
                    {
                        msgId: '1',
                        text: 'yes',
                        sender: 'gpt',
                    },
                ],
                model: 'gpt',
                date: '27.05',
            },
            {
                chatId: '1',
                messages: [
                    {
                        msgId: '0',
                        text: 'aboba????',
                        sender: 'user',
                    },
                    {
                        msgId: '1',
                        text: '1awdaw434444444444dawdawdawdawdawdwadawdwadawawdawdawdd2',
                        sender: 'gpt',
                    },
                ],
                model: 'gemini',
                date: '28.05',
            },
        ],
        tokenGemeni: '',
        tokenGpt: '',
        currentСhatId: '1',
    }),
    getters: {
        currentСhatMessages: (state) => {
            const currentСhat = state.chats.find(chat => chat.chatId === state.currentСhatId);
             return currentСhat.messages;
        },
    },
    actions: {
        changeChat(id) {
            this.currentСhatId = id;
        },
        newMessage(text) {
            if (!text) return
            this.currentСhatMessages.push({msgId: messageId++, text, sender: "user"})
        }
    }
})