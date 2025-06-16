<template>
    <div class="chat__form">
        <input type="text" placeholder="Введите сообщение...">
        <button></button>
    </div>
</template>

<script setup>

</script>

<style scoped>
.chat__form {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    position: absolute;
    bottom: 0;
    width: calc(100% - 40px);
    background-color: #fff;
    border-top: 1px solid #ccc;
}

.chat__form input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
}

.chat__form button {
    width: 36px;
    height: 36px;
    margin-left: 10px;
    border-radius: 50%;
    background-color: #4CAF50;
    border: none;
    cursor: pointer;
}
</style>