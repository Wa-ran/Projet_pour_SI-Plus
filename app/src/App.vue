<template>
  <div>
    <button @click="test">
      Test
    </button>
    <div>
      {{ serverMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const serverMessage = ref("nothing");
const test = async function() {
  await store.dispatch("request").then(res => serverMessage.value = String(res))
}
</script>

<style lang="scss" scoped>

</style>
