<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="saveTokens(geminiToken, gptToken)">
      <h2 class="login-form__title">ВХОД</h2>
      <div class="input-group">
        <div class="input-group__icon">
          <img v-if="tokenGpt == ''" src="../assets/gpt.png">
          <img v-else src="../assets/gpt_active.png">
        </div>
        <input v-model="gptToken" type="text" class="input-group__input" placeholder="Токен ChatGPT"
          aria-label="Токен ChatGPT" />
      </div>

      <div class="input-group">
        <div class="input-group__icon">
          <img v-if="tokenGemini == ''" src="../assets/gemini.png">
          <img v-else src="../assets/gemini_active.png">
        </div>
        <input v-model="geminiToken" type="text" class="input-group__input" placeholder="Токен Gemini"
          aria-label="Токен Gemini" />
      </div>

      <button type="submit" class="login-form__button">Сохранить токен</button>

      <a target="_blank" href="https://docs.google.com/document/d/15y8hTKGTWBbTZITkLnNtly_z5lwKGQwRVJ27GcYt3KI/edit?usp=sharing" class="login-form__link">как получить токен?</a>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '../stores/mainStore'
import { storeToRefs } from 'pinia'

const store = useStore();
const {tokenGemini,tokenGpt} = storeToRefs(store);

const gptToken = ref('');
const geminiToken = ref('');

const saveTokens = (gemini, gpt) => {
  store.saveTokens(gemini, gpt);

  gptToken.value = '';
  geminiToken.value = '';
};

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
}

.login-form {
  background-color: #f0f2f5;
  /* Цвет фона формы */
  padding: 40px;
  border-radius: 24px;
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.login-form__title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}


.input-group__icon{
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  background-image: '../assets/gemini.png';
  margin-right: 15px;
}

.input-group__input {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  /* Небольшое скругление поля ввода */
  font-size: 16px;
  background-color: #ffffff;
  outline: none;
  /* Убираем стандартную обводку при фокусе */
  transition: box-shadow 0.2s ease-in-out;
}

.input-group__input::placeholder {
  color: #999;
}

.input-group__input:focus {
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.5);
  /* Подсветка при фокусе */
}

.login-form__button {
  width: 100%;
  padding: 14px 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #65b867;
  /* Зеленый цвет кнопки */
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  /* Полностью скругленные края */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.login-form__button:hover {
  background-color: #559d57;
  /* Более темный оттенок при наведении */
}

.login-form__link {
  font-size: 14px;
  color: #3b82f6;
  /* Синий цвет ссылки */
  text-decoration: none;
}

.login-form__link:hover {
  text-decoration: underline;
}
</style>