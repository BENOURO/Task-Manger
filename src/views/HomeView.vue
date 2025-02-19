<template>
  <div class="home">
    <h1>Task Manager</h1>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
html{
  background-color: white;
  margin:0px;
  padding:0px;
  min-height: 100vh;
}
h1{
  background-color: white;
}
div#app{
  background-color: white;
}
</style>
