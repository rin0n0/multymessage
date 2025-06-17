<template>
    <div class="chatlist">
        <div v-if="chats">
        <div class="chatlist__chat" @click="changeChat(chat.chatId)" v-for="chat in chats" :key="chat.id" :class="chat.model">
            <div class="chatlist__chat__left">
                <div class="chatlist__chat__img"></div>
            </div>
            <div class="chatlist__chat__meta">
                <div class="chatlist__chat__meta__top">
                    <h1>Чат #{{chat.chatId}}</h1>
                    <p>{{chat.date}}</p>
                </div>
                <div class="chatlist__chat__meta__bottom">
                    <span >{{ chat.messages.at(-1).text }}</span>
                    <button @click="deleteChat(chat.chatId)">&#x2715;</button>
                </div>
            </div>
        </div>
        </div>
        <div class="chatlist__add">
            <button @click="newChat('gpt')">Gpt</button>
            <button @click="newChat('gemini')">Gemini</button>
        </div>
    </div>
</template>

<script setup>
    import { useStore } from '../stores/mainStore'
    import { storeToRefs } from 'pinia'

    const store = useStore()
    const {chats} = storeToRefs(store)
    const {changeChat, newChat, deleteChat} = store;
</script>

<style scoped>
.chatlist {
    background-color: #e6e6e6;
    padding: 10px;
    width: 20%;
    max-width: 300px;
    min-width: 100px;
    overflow: hidden;
    border-right: 1px solid #ccc;
}

.chatlist__add{
    width: 100%;
    display: flex;
    gap: 2%;
}
.chatlist__add button{
    flex:1;
}


.chatlist__chat {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
    background-color: white;
    margin-bottom: 10px;
    cursor: pointer;
    overflow: hidden;
}

.gpt .chatlist__chat__img{
    background: url('../assets/gpt.png');
    background-size: cover;
    width: 45px;
    height: 45px;
    border-radius: 50%;
}

.gemini .chatlist__chat__img{
    background: url('../assets/gemini.png');
    background-size: cover;
    width: 45px;
    height: 45px;
    border-radius: 50%;
}

.chatlist__chat__meta {
    width: 80%;
}

.chatlist__chat__meta__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chatlist__chat__meta__top h1 {
    font-size: 16px;
    font-weight: 600;
}

.chatlist__chat__meta__top img {
    width: 12px;
    height: 12px;
    margin: 0 5px;
}

.chatlist__chat__meta__top p {
    font-size: 12px;
    color: gray;
}

.chatlist__chat__meta__bottom {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #555;
    margin-top: 5px;
}

.chatlist__chat__meta__bottom button{
    font-size: 10px;
    width: 20px;
    height: 20px;
    color:black;
}

.chatlist__chat__meta__bottom span{
    overflow: hidden;
    height: 40px;
}

</style>