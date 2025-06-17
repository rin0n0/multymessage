<template>
    <form @submit.prevent="handleNewMessage">
        <input type="text" v-model="msg" placeholder="Введите сообщение...">
        <button type="submit"></button>
    </form>
</template>

<script setup>
    import { useStore } from '../stores/mainStore'
    import { defineModel } from 'vue';

    const msg = defineModel({type: String})
    const store = useStore()
    const {newMessage} = store;

    function handleNewMessage() {
        newMessage(msg.value.trim())
        msg.value = '';
    }
</script>

<style scoped>
form {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    position: absolute;
    bottom: 0;
    width: calc(100% - 40px);
    background-color: #fff;
    border-top: 1px solid #ccc;
}

form input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
}

form button {
    min-width: 36px;
    min-height: 36px;
    margin-left: 10px;
    border-radius: 50%;
    background-color: #4CAF50;
    border: none;
    cursor: pointer;
}
</style>