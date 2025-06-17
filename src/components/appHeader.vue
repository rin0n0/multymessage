Отлично! Вот тот же код, но без комментариев, для более чистого вида.

<template>
    <nav>
        <h1>Multy Message</h1>
        <a target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5Hgu1mmSEZyBxy1se6L3bdigLnaKNsV5ktR0QstKNtmAj7g/viewform?usp=header">обратная
            связь</a>
        <div class="login">
            <p v-if="activePage==='main'" @click="changePage">Вход</p>
            <p  v-if="activePage==='login'" @click="changePage">Назад</p>
            <img @click="changePage" src="../assets/login.png" alt="log" id="log">
            <img src="../assets/gemini.png" alt="gpt">
            <img src="../assets/gpt.png" alt="gemeni">
        </div>
    </nav>
</template>

<script setup>
import { useStore } from '../stores/mainStore'
import { storeToRefs } from 'pinia'

const store = useStore();
const {activePage} = storeToRefs(store);
const {changePage} = store;
</script>

<style scoped>
nav {
    height: 60px;
    background: #D9D9D9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3%;
    font-weight: bold;
}

h1 {
    font-weight: 800;
    font-size: 20px;
    user-select: none;
}

a {
    color: #0095f6;
    font-size: 14px;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.login {
    display: flex;
    align-items: center;
    gap: 5px;
}

.login p {
    margin: 0;
    user-select: none;
    cursor: pointer;
}

#log {
    margin-right: 1vw;
    cursor: pointer;
}

img {
    width: 20px;
    height: 20px;
}
</style>
