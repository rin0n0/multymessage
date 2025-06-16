<template>
  <Header/>
  <Main/>
</template>

<script>
import Header from './components/appHeader.vue'
import Main from './components/appMain.vue'

export default {
  name: 'App',
  components: {
    Header,
    Main
  }
}
</script>

