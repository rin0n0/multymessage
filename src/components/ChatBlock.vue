<template>
    <div class="chat">
        <MessagesList/>
        <MessageForm/>
    </div>
</template>

<script setup>
    import MessagesList from './MessagesList.vue';
    import MessageForm from './MessageForm.vue';
</script>

<style scoped>
.chat {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    position: relative;
}
</style>