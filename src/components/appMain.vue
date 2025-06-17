<template>
    <main>
        <ChatList v-if="activePage === 'main'"/>
        <ChatBlock v-if="activePage === 'main'"/>
        <Login v-if="activePage === 'login'"/>
    </main>
</template>

<script setup>
    import ChatList from './ChatsList.vue';
    import ChatBlock from './ChatBlock.vue';
    import Login from './appLogin.vue';
    import { useStore } from '../stores/mainStore'
    

    const store = useStore()
    const {activePage} = storeToRefs(store)
</script>

<style scoped>
main{
    display: flex;
    height: calc(100vh - 60px);
}
</style>