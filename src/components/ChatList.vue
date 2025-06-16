<template>
    <div class="chatlist">
        <div class="chatlist__chat">
            <div class="chatlist__chat__img">
                <img src="" alt="avatar">
            </div>
            <div class="chatlist__chat__meta">
                <div class="chatlist__chat__meta__top">
                    <h1>Название</h1>
                    <img src="" alt="ischecked">
                    <p>22:41</p>
                </div>
                <div class="chatlist__chat__meta__bottom">
                    текст сообщения текст сообщения текст соо...
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chatlist {
    width: 300px;
    background-color: #e6e6e6;
    padding: 10px;
    overflow-y: auto;
    border-right: 1px solid #ccc;
}

.chatlist__chat {
    display: flex;
    padding: 10px;
    border-radius: 8px;
    background-color: white;
    margin-bottom: 10px;
    cursor: pointer;
}

.chatlist__chat__img img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
}

.chatlist__chat__meta {
    flex: 1;
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
    color: #555;
    margin-top: 5px;
}

</style>