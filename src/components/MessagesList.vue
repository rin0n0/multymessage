<template>
    <div class="chat__messages">
        <div class="chat__message__my">
            <p>Напиши css для сайта. Прикладываю изображение макета фигмы и разметку html. Шрифт монсерат. Файлы css
                должны быть разделены на chat.css chatlist.css nav.css и для общих стилей main.css. Вот разметка:</p>
        </div>
        <div class="chat__message__his">
            <p>Вот структура CSS по папкам и содержимому файлов для вёрстки интерфейса мессенджера "Multy Message" на
                основе макета.</p>
        </div>
    </div>
</template>

<script setup>

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

.chat__message__my {
    align-self: flex-end;
    background-color: #c0dfc4;
    padding: 12px 18px;
    border-radius: 15px 15px 0 15px;
    max-width: 60%;
}

.chat__message__his {
    align-self: flex-start;
    background-color: #ddd;
    padding: 12px 18px;
    border-radius: 15px 15px 15px 0;
    max-width: 60%;
}
</style>