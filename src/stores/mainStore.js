import { defineStore } from "pinia";

const API_URL_GPT = 'https://nexra.aryahcr.cc/api/chat/gptweb';
const TASK_URL_GPT = 'https://nexra.aryahcr.cc/api/chat/task';
const API_URL_GEMINI = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY"

async function waitForGptResult(taskId) {
    for (let i = 0; i < 30; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            const response = await fetch(`${TASK_URL_GPT}/${encodeURIComponent(taskId)}`);
            if (!response.ok) {
                console.error(`Ошибка проверки задачи GPT: Статус ${response.status}`);
                continue;
            }
            const data = await response.json();
            if (data.status === 'completed') {
                return data;
            } else if (data.status === 'error') {
                throw new Error(data.error || 'Ошибка обработки задачи GPT на сервере');
            }
        } catch (error) {
            console.error('Критическая ошибка при проверке задачи GPT:', error);
            if (i === 29) throw error;
        }
    }
    throw new Error('Превышено время ожидания ответа от GPT API');
}

async function callGptApi(prompt) {
    const response = await fetch(API_URL_GPT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            markdown: false
        })
    });

    if (!response.ok) {
        throw new Error(`Ошибка при создании задачи GPT: статус ${response.status}`);
    }
    const data = await response.json();
    if (!data.id) {
        throw new Error('API GPT не вернуло ID задачи');
    }
    const result = await waitForGptResult(data.id);
    if (result?.gpt) {
        return result.gpt;
    } else {
        throw new Error('API GPT вернуло пустой ответ');
    }
}

async function callGeminiApi(messages, apiKey) {
    if (!apiKey) {
        throw new Error('Отсутствует токен для Gemini API. Добавьте его в хранилище.');
    }
    const contents = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));
    const response = await fetch(`${API_URL_GEMINI}${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents })
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Ошибка Gemini API: ${errorData.error?.message || response.statusText}`);
    }
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
        throw new Error('Gemini API вернуло пустой или некорректный ответ.');
    }
    return text;
}

export const useStore = defineStore('store', {
    state: () => ({
        chats: [],
        tokenGemini: 'AIzaSyBCOo8nssaAiEw1DRg5gkP7PksazQoyDcE',
        tokenGpt: '',
        currentСhatId: null,
        activePage: 'main',
    }),
    persist: true,
    getters: {
        currentChat: (state) => {
            return state.chats.find(chat => chat.chatId === state.currentСhatId) || null;
        },
        currentСhatMessages() {
            return this.currentChat ? this.currentChat.messages : [];
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
        async newMessage(text) {
            if (!text || !this.currentChat) return;

            const model = this.currentChat.model;
            this.currentСhatMessages.push({
                msgId: this._getNextMessageId(),
                text,
                sender: "user"
            });

            if (model === 'gpt' || model === 'gemini') {
                const responseMsgId = this._getNextMessageId();
                this.currentСhatMessages.push({
                    msgId: responseMsgId,
                    text: 'печатает...',
                    sender: model,
                    loading: true
                });

                try {
                    let responseText = '';
                    const conversationHistory = this.currentСhatMessages.filter(m => !m.loading);

                    if (model === 'gpt') {
                        let prompt = conversationHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
                        prompt += `\n${model}:`;
                        responseText = await callGptApi(prompt);
                    } else if (model === 'gemini') {
                        responseText = await callGeminiApi(conversationHistory, this.tokenGemini);
                    }
                    const responseMessage = this.currentСhatMessages.find(m => m.msgId === responseMsgId);
                    if (responseMessage) {
                        responseMessage.text = responseText.trim();
                        delete responseMessage.loading;
                    }
                } catch (error) {
                    console.error(`Ошибка при получении ответа от ${model}:`, error);
                    const responseMessage = this.currentСhatMessages.find(m => m.msgId === responseMsgId);
                    if (responseMessage) {
                        responseMessage.text = `Произошла ошибка: ${error.message}`;
                        responseMessage.error = true;
                        delete responseMessage.loading;
                    }
                }
            }
        },
        newChat(model) {
            const newId = this._getNextChatId();
            this.chats.push({
                chatId: newId,
                messages: [{
                    msgId: this._getNextMessageId(),
                    text: "Проси, что хочешь!",
                    sender: model
                }],
                model,
                date: getFormattedDate()
            });
            this.currentСhatId = newId;
        },
        deleteChat(id) {
            this.chats = this.chats.filter(chat => chat.chatId !== id);
            if (this.currentСhatId === id) {
                this.currentСhatId = this.chats.length > 0 ? this.chats[0].chatId : null;
            }
        },
        changePage() {
            this.activePage = this.activePage === 'main' ? 'login' : 'main';
        },
        saveTokens(geminiToken, gptToken) {
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