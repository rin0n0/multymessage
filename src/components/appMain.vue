<template>
    <main>
        <ChatList/>
        <ChatBlock/>
    </main>
</template>

<script setup>
    import ChatList from './ChatList.vue';
    import ChatBlock from './ChatBlock.vue';
</script>

<style scoped>
main{
    display: flex;
    height: calc(100vh - 60px);
}
</style>