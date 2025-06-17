import { defineStore } from "pinia";

const API_URL = 'https://nexra.aryahcr.cc/api/chat/gptweb';
const TASK_URL = 'https://nexra.aryahcr.cc/api/chat/task';

async function waitForResult(taskId) {
    for (let i = 0; i < 30; i++) { 
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
            const response = await fetch(`${TASK_URL}/${encodeURIComponent(taskId)}`);
            if (!response.ok) {
                console.error(`Ошибка проверки задачи: Статус ${response.status}`);
                continue;
            }

            const data = await response.json();
            
            console.log('Статус задачи:', data);
            
            if (data.status === 'completed') {
                return data; 
            } else if (data.status === 'error') {
                throw new Error(data.error || 'Ошибка обработки задачи на сервере');
            }
        } catch (error) {
            console.error('Критическая ошибка при проверке задачи:', error);
            if (i === 29) throw error; 
        }
    }
    throw new Error('Превышено время ожидания ответа от API');
}


export const useStore = defineStore('store', {
    state: () => ({
        chats: [],
        tokenGemini: '',
        tokenGpt: '',
        currentСhatId: '',
        activePage: 'main',
    }),
    persist: true,
    getters: {
        currentСhat: (state) => {
            return state.chats.find(chat => chat.chatId === state.currentСhatId);
        },
        currentСhatMessages() {
            const currentChat = this.currentСhat;
            return currentChat ? currentChat.messages : undefined;
        },
    },
    actions: {
        _getNextChatId() {
            if (this.chats.length === 0) return 1;
            const maxId = Math.max(...this.chats.map(chat => chat.chatId));
            return maxId + 1;
        },
        _getNextMessageId() {
            const allMessages = this.chats.flatMap(chat => chat.messages);
            if (allMessages.length === 0) return 1;
            const maxId = Math.max(...allMessages.map(msg => msg.msgId));
            return maxId + 1;
        },

        changeChat(id) {
            this.currentСhatId = id;
        },

        newMessage(text) {
            if (!text || !this.currentСhatMessages) return;
            const newMsgId = this._getNextMessageId();
            this.currentСhatMessages.push({msgId: newMsgId, text, sender: "user"});

            if (this.currentСhat?.model === 'gpt') {
                this.getGptResponse();
            }
        },

        async getGptResponse() {
            if (!this.currentСhatMessages) return;
            const typingMessageId = this._getNextMessageId();
            const typingMessage = { msgId: typingMessageId, text: "печатает...", sender: "gpt", isTyping: true };
            this.currentСhatMessages.push(typingMessage);

            const prompt = "не используй markdown!" + this.currentСhatMessages
                .filter(msg => !msg.isTyping)
                .map(msg => `${msg.sender}: ${msg.text}`)
                .join('\n');
            
            console.log("Отправка промпта в API:", prompt);

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt, markdown: false })
                });

                if (!response.ok) throw new Error(`Ошибка API: ${response.statusText}`);

                const data = await response.json();
                if (!data.id) throw new Error('API не вернул ID задачи');

                const result = await waitForResult(data.id);

                if (result?.gpt) {
                    const typingMsgIndex = this.currentСhatMessages.findIndex(m => m.msgId === typingMessage.msgId);
                    if (typingMsgIndex !== -1) {
                         this.currentСhatMessages[typingMsgIndex] = { msgId: typingMessage.msgId, text: result.gpt, sender: "gpt"};
                    }
                } else {
                    throw new Error('Пустой ответ от API');
                }

            } catch (error) {
                console.error("Ошибка при получении ответа от GPT:", error);
                const typingMsgIndex = this.currentСhatMessages.findIndex(m => m.msgId === typingMessage.msgId);
                if (typingMsgIndex !== -1) {
                    this.currentСhatMessages[typingMsgIndex] = { msgId: typingMessage.msgId, text: `Ошибка: ${error.message}`, sender: "gpt", isError: true };
                }
            }
        },

        newChat(model){
            const newId = this._getNextChatId();
            const firstMsgId = this._getNextMessageId();

            this.chats.push({
                chatId: newId, 
                messages: [{msgId: firstMsgId, text: "Проси, что хочешь!", sender: model}], 
                model, 
                date: getFormattedDate()
            });
            this.currentСhatId = newId;
        },

        deleteChat(id){
            this.chats = this.chats.filter(chat => chat.chatId !== id);
            if (this.currentСhatId === id) {
                this.currentСhatId = this.chats.length > 0 ? this.chats[0].chatId : '';
            }
        },
        changePage(){
            if (this.activePage==='main') this.activePage='login';
            else if (this.activePage==='login') this.activePage='main';
        },
        saveTokens(geminiToken,gptToken){
            this.tokenGemini = geminiToken;
            this.tokenGpt = gptToken;
        },
    }
})

function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}`;
}