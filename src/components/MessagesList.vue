<template>
    <div class="chat__messages">
        <div class="chat__message" v-for="message in currentСhatMessages" :key="message.msgId" :class="message.sender">
            <p>{{ message.text }}</p>
        </div>
    </div>
</template>

<script setup>
    import {useStore} from '../stores/mainStore'
    import { storeToRefs } from 'pinia';

    const store = useStore()
    const {currentСhatMessages} = storeToRefs(store)

</script>

<style scoped>
.chat__messages {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 60px;
}

.user {
    align-self: flex-end;
    background-color: #c0dfc4;
    padding: 12px 18px;
    border-radius: 15px 15px 0 15px;
    max-width: 60%;
}

.gpt {
    align-self: flex-start;
    background-color: #ddd;
    padding: 12px 18px;
    border-radius: 15px 15px 15px 0;
    max-width: 60%;
}
.gemeni {
    align-self: flex-start;
    background-color: #c1b8e4;
    padding: 12px 18px;
    border-radius: 15px 15px 15px 0;
    max-width: 60%;
}
</style>